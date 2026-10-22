import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import express from 'express';
import { pipeline } from 'stream/promises';

export const WEBHOOK_PATH = '/api/stripe/webhook';
export const DOWNLOAD_PATH = '/api/safedelete-pro/download';
const SIGNATURE_TOLERANCE_SECONDS = 300;
const SESSION_ID_RE = /^cs_[A-Za-z0-9_]+$/;
const DEFAULT_DOWNLOAD_BASE = 'https://devndespro-production.up.railway.app';
const DEFAULT_VOLUME_ROOT = '/data/safedelete';
const DEFAULT_ZIP_NAME = 'DevnDespro-SafeDelete-Pro.zip';
const POSTGRES_VOLUME_MARKERS = ['/var/lib/postgresql', '/var/lib/pgsql'];

const FULFILLMENT_EVENTS = new Set([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
]);

export const ENSURE_PURCHASES_SQL = `
  CREATE TABLE IF NOT EXISTS safedelete_purchases (
    id BIGSERIAL PRIMARY KEY,
    stripe_event_id TEXT NOT NULL UNIQUE,
    checkout_session_id TEXT NOT NULL UNIQUE,
    payment_intent_id TEXT,
    payment_link_id TEXT NOT NULL,
    price_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    amount_total INTEGER NOT NULL,
    currency TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    livemode BOOLEAN NOT NULL,
    token_hash TEXT UNIQUE,
    delivery_token TEXT,
    token_expires_at TIMESTAMPTZ,
    download_count INTEGER NOT NULL DEFAULT 0,
    download_limit INTEGER NOT NULL DEFAULT 5,
    email_sent_at TIMESTAMPTZ,
    email_claimed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

const PURCHASE_COLUMN_SQL = [
  'ALTER TABLE safedelete_purchases ADD COLUMN IF NOT EXISTS token_hash TEXT',
  'ALTER TABLE safedelete_purchases ADD COLUMN IF NOT EXISTS delivery_token TEXT',
  'ALTER TABLE safedelete_purchases ADD COLUMN IF NOT EXISTS token_expires_at TIMESTAMPTZ',
  'ALTER TABLE safedelete_purchases ADD COLUMN IF NOT EXISTS download_count INTEGER NOT NULL DEFAULT 0',
  'ALTER TABLE safedelete_purchases ADD COLUMN IF NOT EXISTS download_limit INTEGER NOT NULL DEFAULT 5',
  'ALTER TABLE safedelete_purchases ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ',
  'ALTER TABLE safedelete_purchases ADD COLUMN IF NOT EXISTS email_claimed_at TIMESTAMPTZ',
  'CREATE UNIQUE INDEX IF NOT EXISTS safedelete_purchases_token_hash_uidx ON safedelete_purchases (token_hash)',
];

function idOf(value) {
  if (typeof value === 'string' && value) return value;
  if (value && typeof value === 'object' && typeof value.id === 'string') return value.id;
  return null;
}

export function expectedLivemode(secretKey) {
  if (secretKey.startsWith('sk_live_') || secretKey.startsWith('rk_live_')) return true;
  if (secretKey.startsWith('sk_test_') || secretKey.startsWith('rk_test_')) return false;
  return null;
}

function positiveInt(value, fallback) {
  if (value == null || value === '') return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function readSafeDeleteConfig(env = process.env) {
  const parsedAmount = Number(env.STRIPE_EXPECTED_UNIT_AMOUNT ?? 500);
  return {
    secretKey: String(env.STRIPE_SECRET_KEY || ''),
    webhookSecret: String(env.STRIPE_WEBHOOK_SECRET || ''),
    paymentLinkId: String(env.STRIPE_PAYMENT_LINK_ID || ''),
    priceId: String(env.STRIPE_PRICE_ID || ''),
    productId: String(env.STRIPE_PRODUCT_ID || ''),
    currency: String(env.STRIPE_EXPECTED_CURRENCY || 'usd').trim().toLowerCase(),
    unitAmount: parsedAmount,
    productCode: String(env.SAFEDELETE_PRODUCT_CODE || 'safedelete-pro').trim(),
    tokenTtlHours: positiveInt(env.DOWNLOAD_TOKEN_TTL_HOURS, 72),
    downloadLimit: positiveInt(env.DOWNLOAD_LIMIT, 5),
    downloadBaseUrl: String(env.DOWNLOAD_LINK_BASE_URL || DEFAULT_DOWNLOAD_BASE).replace(/\/$/, ''),
    volumeRoot: String(env.SAFEDELETE_VOLUME_ROOT || DEFAULT_VOLUME_ROOT),
    zipPath: String(env.SAFEDELETE_ZIP_PATH || path.join(env.SAFEDELETE_VOLUME_ROOT || DEFAULT_VOLUME_ROOT, DEFAULT_ZIP_NAME)),
    zeptoToken: String(env.ZOHO_ZEPTOMAIL_TOKEN || ''),
    fromAddress: String(env.ZOHO_FROM_EMAIL || ''),
    toAddress: String(env.ZOHO_TO_EMAIL || env.CONTACT_TO_EMAIL || ''),
    zeptoApiUrl: String(env.ZOHO_ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email'),
  };
}

export function missingPaymentSettings(config = {}) {
  const missing = [];
  const secretKey = String(config.secretKey || '');
  if (!secretKey || expectedLivemode(secretKey) === null) missing.push('STRIPE_SECRET_KEY');
  if (!config.webhookSecret) missing.push('STRIPE_WEBHOOK_SECRET');
  if (!config.paymentLinkId) missing.push('STRIPE_PAYMENT_LINK_ID');
  if (!config.priceId) missing.push('STRIPE_PRICE_ID');
  if (!config.productId) missing.push('STRIPE_PRODUCT_ID');
  if (!Number.isInteger(config.unitAmount) || config.unitAmount <= 0) missing.push('STRIPE_EXPECTED_UNIT_AMOUNT');
  if (!config.currency) missing.push('STRIPE_EXPECTED_CURRENCY');
  if (!String(config.zeptoToken || '').trim()) missing.push('ZOHO_ZEPTOMAIL_TOKEN');
  if (!String(config.fromAddress || '').trim()) missing.push('ZOHO_FROM_EMAIL');
  return missing;
}

export function configError(config) {
  if (missingPaymentSettings(config).length > 0) return 'Webhook is not configured';
  return null;
}

function signaturesEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function constructStripeEvent(payload, header, secret, nowMs = Date.now()) {
  const raw = Buffer.isBuffer(payload) ? payload.toString('utf8') : String(payload || '');
  const pieces = String(header || '').split(',').map((part) => part.trim()).filter(Boolean);
  let timestamp = null;
  const signatures = [];
  for (const piece of pieces) {
    const separator = piece.indexOf('=');
    if (separator === -1) continue;
    const key = piece.slice(0, separator);
    const value = piece.slice(separator + 1);
    if (key === 't') timestamp = value;
    if (key === 'v1' && value) signatures.push(value);
  }

  const timestampSeconds = Number(timestamp);
  const ageSeconds = Math.abs(nowMs / 1000 - timestampSeconds);
  if (!Number.isInteger(timestampSeconds) || signatures.length === 0 || ageSeconds > SIGNATURE_TOLERANCE_SECONDS) {
    const error = new Error('Invalid webhook signature');
    error.code = 'signature_invalid';
    throw error;
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestampSeconds}.${raw}`, 'utf8')
    .digest('hex');
  const valid = signatures.some((signature) => signaturesEqual(signature, expected));
  if (!valid) {
    const error = new Error('Invalid webhook signature');
    error.code = 'signature_invalid';
    throw error;
  }

  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error('Invalid webhook payload');
    error.code = 'payload_invalid';
    throw error;
  }
}

export async function retrieveCheckoutSession(sessionId, secretKey) {
  const url = new URL(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`);
  url.searchParams.append('expand[]', 'line_items');
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${secretKey}` },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    const error = new Error('Stripe session retrieve failed');
    error.code = `stripe_${response.status}`;
    throw error;
  }
  return response.json();
}

export function evaluateCheckoutSession(session, config) {
  if (!session || typeof session !== 'object') {
    return { ok: false, retry: true, reason: 'session_unavailable' };
  }

  const lineItems = session.line_items?.data;
  if (!Array.isArray(lineItems)) {
    return { ok: false, retry: true, reason: 'line_items_unavailable' };
  }

  const live = expectedLivemode(config.secretKey);
  if (live === null) {
    return { ok: false, retry: true, reason: 'key_mode_unknown' };
  }
  if (session.livemode !== live) {
    return { ok: false, retry: false, reason: 'livemode_mismatch' };
  }
  if (session.mode !== 'payment') {
    return { ok: false, retry: false, reason: 'wrong_mode' };
  }
  if (session.status !== 'complete') {
    return { ok: false, retry: false, reason: 'not_complete' };
  }
  if (session.payment_status !== 'paid') {
    return { ok: false, retry: false, reason: 'unpaid' };
  }

  const paymentLinkId = idOf(session.payment_link);
  if (paymentLinkId !== config.paymentLinkId) {
    return { ok: false, retry: false, reason: 'wrong_payment_link' };
  }

  const metadataProduct = session.metadata?.product;
  if (typeof metadataProduct === 'string' && metadataProduct.trim() && metadataProduct !== config.productCode) {
    return { ok: false, retry: false, reason: 'wrong_product' };
  }

  if (lineItems.length !== 1) {
    return { ok: false, retry: false, reason: 'wrong_product' };
  }

  const item = lineItems[0];
  const price = item?.price;
  const productId = idOf(price?.product);
  if (!price || price.id !== config.priceId || productId !== config.productId || price.type !== 'one_time') {
    return { ok: false, retry: false, reason: 'wrong_product' };
  }
  if (Number(item.quantity) !== 1) {
    return { ok: false, retry: false, reason: 'wrong_product' };
  }
  if (String(price.currency || '').toLowerCase() !== config.currency) {
    return { ok: false, retry: false, reason: 'wrong_product' };
  }
  if (Number(price.unit_amount) !== config.unitAmount) {
    return { ok: false, retry: false, reason: 'wrong_amount' };
  }
  if (Number(item.amount_discount || 0) !== 0) {
    return { ok: false, retry: false, reason: 'discount' };
  }

  const presentment = String(session.currency || '').toLowerCase();
  const amountTotal = Number(session.amount_total);
  if (!Number.isInteger(amountTotal)) {
    return { ok: false, retry: true, reason: 'amount_unavailable' };
  }
  if (presentment === config.currency && amountTotal !== config.unitAmount) {
    return { ok: false, retry: false, reason: 'wrong_amount' };
  }

  const email = String(session.customer_details?.email || '').trim();
  if (!email.includes('@')) {
    return { ok: false, retry: false, reason: 'missing_email' };
  }

  const name = session.customer_details?.name
    ? String(session.customer_details.name).slice(0, 200)
    : null;

  return {
    ok: true,
    email,
    name,
    paymentLinkId,
    priceId: price.id,
    productId,
    amountTotal,
    currency: presentment,
    paymentIntentId: idOf(session.payment_intent),
  };
}

function isUniqueViolation(err) {
  const message = String(err?.message || '');
  return err?.code === '23505' || /duplicate key|unique constraint/i.test(message);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function createDownloadToken() {
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  return { token, tokenHash };
}

export function hashDownloadToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

export function buildDownloadUrl(baseUrl, token) {
  const root = String(baseUrl || DEFAULT_DOWNLOAD_BASE).replace(/\/$/, '');
  return `${root}${DOWNLOAD_PATH}?token=${encodeURIComponent(token)}`;
}

function storageError(code) {
  const error = new Error(code === 'storage_unavailable' ? 'Download file is unavailable' : 'Download storage is not configured');
  error.code = code;
  return error;
}

function isInsideRoot(root, candidate) {
  const relative = path.relative(root, candidate);
  return Boolean(relative) && !relative.startsWith('..') && !path.isAbsolute(relative);
}

function isPostgresVolume(candidate) {
  const normalized = path.resolve(candidate).replace(/\\/g, '/').toLowerCase();
  return POSTGRES_VOLUME_MARKERS.some((marker) => normalized.includes(marker));
}

export function resolvePrivateZip(config, fsImpl = fs) {
  const rootInput = String(config?.volumeRoot || '').trim();
  const zipInput = String(config?.zipPath || '').trim();
  if (!rootInput || !zipInput || !path.isAbsolute(rootInput) || !path.isAbsolute(zipInput)) {
    throw storageError('storage_not_configured');
  }
  if (isPostgresVolume(rootInput) || isPostgresVolume(zipInput)) {
    throw storageError('storage_not_configured');
  }

  const root = path.resolve(rootInput);
  const zipPath = path.resolve(zipInput);
  if (!isInsideRoot(root, zipPath)) {
    throw storageError('storage_not_configured');
  }

  let realRoot;
  let realFile;
  try {
    realRoot = fsImpl.realpathSync(root);
    realFile = fsImpl.realpathSync(zipPath);
  } catch {
    throw storageError('storage_unavailable');
  }
  if (isPostgresVolume(realRoot) || isPostgresVolume(realFile) || !isInsideRoot(realRoot, realFile)) {
    throw storageError('storage_not_configured');
  }

  const stat = fsImpl.statSync(realFile);
  if (!stat.isFile() || stat.size <= 0) {
    throw storageError('storage_unavailable');
  }
  return { filePath: realFile, size: stat.size };
}

export function openConfiguredZip(config, fsImpl = fs) {
  const located = resolvePrivateZip(config, fsImpl);
  return {
    size: located.size,
    createStream() {
      return fsImpl.createReadStream(located.filePath);
    },
  };
}

export async function sendSafeDeleteDownloadEmail({ to, name, downloadUrl, config }) {
  if (!config?.zeptoToken || !config.fromAddress) {
    const error = new Error('Email is not configured');
    error.code = 'email_not_configured';
    throw error;
  }
  const zeptoToken = String(config.zeptoToken).replace(/^Zoho-enczapikey\s+/i, '');
  const safeName = escapeHtml(name || 'there');
  const response = await fetch(config.zeptoApiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Zoho-enczapikey ${zeptoToken}`,
    },
    body: JSON.stringify({
      from: { address: config.fromAddress, name: 'devndespro' },
      to: [{ email_address: { address: to, name: name || 'Customer' } }],
      subject: 'Your SafeDelete Pro download',
      htmlbody: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;max-width:600px;">
          <h2 style="color:#FF6B2B;">Your SafeDelete Pro download is ready</h2>
          <p>Hi ${safeName},</p>
          <p>Thank you for your purchase. Use the link below to download DevnDespro SafeDelete Pro.</p>
          <p><a href="${escapeHtml(downloadUrl)}">Download SafeDelete Pro</a></p>
          <p>This link expires in ${config.tokenTtlHours} hours and can be used ${config.downloadLimit} times.</p>
          <p>devndespro · Stavanger, Norway</p>
        </div>
      `,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    const error = new Error('ZeptoMail send failed');
    error.code = `zepto_${response.status}`;
    throw error;
  }
}

export async function sendSafeDeleteAdminNotice({ email, checkoutSessionId, config }) {
  if (!config?.toAddress || !config.zeptoToken || !config.fromAddress) return;
  const zeptoToken = String(config.zeptoToken).replace(/^Zoho-enczapikey\s+/i, '');
  const response = await fetch(config.zeptoApiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Zoho-enczapikey ${zeptoToken}`,
    },
    body: JSON.stringify({
      from: { address: config.fromAddress, name: 'devndespro' },
      to: [{ email_address: { address: config.toAddress, name: 'devndespro' } }],
      subject: 'SafeDelete Pro purchase',
      htmlbody: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;">
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Checkout session:</strong> ${escapeHtml(checkoutSessionId)}</p>
        </div>
      `,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    const error = new Error('ZeptoMail notice failed');
    error.code = `zepto_${response.status}`;
    throw error;
  }
}

export async function ensureSafeDeletePurchases(pool) {
  if (!pool) return;
  await pool.query(ENSURE_PURCHASES_SQL);
  for (const statement of PURCHASE_COLUMN_SQL) {
    await pool.query(statement);
  }
}

export async function initializePaymentDatabase(databaseUrl, pool) {
  if (!databaseUrl) return;
  try {
    if (!pool) {
      const error = new Error('Payment database is not configured');
      error.code = 'payment_db_missing';
      throw error;
    }
    await ensureSafeDeletePurchases(pool);
  } catch (error) {
    const failure = new Error('SafeDelete purchases table initialization failed');
    failure.code = error.code || 'error';
    throw failure;
  }
}

export async function savePurchase(pool, row) {
  try {
    const inserted = await pool.query(
      `/* safedelete:insert */
       INSERT INTO safedelete_purchases (
         stripe_event_id, checkout_session_id, payment_intent_id, payment_link_id,
         price_id, product_id, amount_total, currency, customer_email, customer_name, livemode,
         token_hash, delivery_token, token_expires_at, download_limit
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       ON CONFLICT (stripe_event_id) DO NOTHING
       RETURNING id, delivery_token, token_expires_at, customer_email, customer_name, email_sent_at`,
      [
        row.stripeEventId,
        row.checkoutSessionId,
        row.paymentIntentId,
        row.paymentLinkId,
        row.priceId,
        row.productId,
        row.amountTotal,
        row.currency,
        row.customerEmail,
        row.customerName,
        row.livemode,
        row.tokenHash,
        row.deliveryToken,
        row.tokenExpiresAt,
        row.downloadLimit,
      ]
    );
    if (inserted.rows?.[0]?.id != null) {
      return { created: true, row: inserted.rows[0] };
    }
  } catch (err) {
    if (!isUniqueViolation(err)) throw err;
  }

  const existing = await pool.query(
    `/* safedelete:load */
     SELECT id, delivery_token, token_expires_at, customer_email, customer_name, email_sent_at
     FROM safedelete_purchases
     WHERE stripe_event_id = $1 OR checkout_session_id = $2
     ORDER BY id
     LIMIT 1`,
    [row.stripeEventId, row.checkoutSessionId]
  );
  if (!existing.rows?.[0]) {
    const error = new Error('Purchase could not be loaded');
    error.code = 'purchase_missing';
    throw error;
  }
  return { created: false, row: existing.rows[0] };
}

async function claimDelivery(pool, id) {
  const claimed = await pool.query(
    `/* safedelete:claim */
     UPDATE safedelete_purchases
     SET email_claimed_at = NOW()
     WHERE id = $1
       AND email_sent_at IS NULL
       AND delivery_token IS NOT NULL
       AND (email_claimed_at IS NULL OR email_claimed_at < NOW() - INTERVAL '5 minutes')
     RETURNING id, delivery_token, token_expires_at, customer_email, customer_name`,
    [id]
  );
  return claimed.rows?.[0] || null;
}

async function releaseDeliveryClaim(pool, id) {
  await pool.query(
    `/* safedelete:release */
     UPDATE safedelete_purchases
     SET email_claimed_at = NULL
     WHERE id = $1 AND email_sent_at IS NULL`,
    [id]
  );
}

async function markDeliverySent(pool, id) {
  await pool.query(
    `/* safedelete:mark-sent */
     UPDATE safedelete_purchases
     SET email_sent_at = NOW(), delivery_token = NULL, email_claimed_at = NULL
     WHERE id = $1`,
    [id]
  );
}

export async function deliverPurchaseEmail(pool, saved, config, deps) {
  if (saved.row.email_sent_at) {
    return { duplicate: true, emailed: false };
  }

  const claimed = await claimDelivery(pool, saved.row.id);
  if (!claimed) {
    const current = await pool.query(
      `/* safedelete:by-id */
       SELECT email_sent_at FROM safedelete_purchases WHERE id = $1`,
      [saved.row.id]
    );
    if (current.rows?.[0]?.email_sent_at) {
      return { duplicate: true, emailed: false };
    }
    const error = new Error('Download email is already being sent');
    error.code = 'email_in_progress';
    throw error;
  }

  const downloadUrl = buildDownloadUrl(config.downloadBaseUrl, claimed.delivery_token);
  try {
    await deps.sendDownloadEmail({
      to: claimed.customer_email,
      name: claimed.customer_name,
      downloadUrl,
      expiresAt: claimed.token_expires_at,
      config,
    });
  } catch (err) {
    await releaseDeliveryClaim(pool, saved.row.id);
    throw err;
  }

  await markDeliverySent(pool, saved.row.id);
  try {
    await deps.sendAdminNotice({
      email: claimed.customer_email,
      checkoutSessionId: deps.checkoutSessionId,
      config,
    });
  } catch (err) {
    console.error('SafeDelete admin notice failed', err.code || err.name || 'error');
  }

  return saved.created
    ? { recorded: true, emailed: true }
    : { recovered: true, emailed: true };
}

export async function fulfillPaidSession(pool, purchase, config, deps) {
  const token = createDownloadToken();
  const saved = await savePurchase(pool, {
    ...purchase,
    tokenHash: token.tokenHash,
    deliveryToken: token.token,
    tokenExpiresAt: new Date(Date.now() + config.tokenTtlHours * 60 * 60 * 1000).toISOString(),
    downloadLimit: config.downloadLimit,
  });
  return deliverPurchaseEmail(pool, saved, config, deps);
}

export async function redeemDownload(pool, tokenHash) {
  const updated = await pool.query(
    `/* safedelete:redeem */
     UPDATE safedelete_purchases
     SET download_count = download_count + 1
     WHERE token_hash = $1
       AND token_expires_at > NOW()
       AND download_count < download_limit
     RETURNING id`,
    [tokenHash]
  );
  return updated.rows?.[0] || null;
}

export async function releaseDownload(pool, tokenHash) {
  await pool.query(
    `/* safedelete:release-download */
     UPDATE safedelete_purchases
     SET download_count = GREATEST(download_count - 1, 0)
     WHERE token_hash = $1
       AND download_count > 0`,
    [tokenHash]
  );
}

export function createSafeDeleteWebhookHandler(options = {}) {
  const getConfig = options.getConfig || (() => readSafeDeleteConfig());
  const getPool = options.getPool || (() => null);
  const retrieveSession = options.retrieveSession || retrieveCheckoutSession;
  const sendDownloadEmail = options.sendDownloadEmail || sendSafeDeleteDownloadEmail;
  const sendAdminNotice = options.sendAdminNotice || sendSafeDeleteAdminNotice;

  return async function safedeleteWebhook(req, res) {
    let eventId = 'unknown';
    try {
      const config = getConfig();
      if (configError(config)) {
        return res.status(500).json({ received: false, error: 'Webhook is not configured' });
      }

      const payload = req.body;
      const signature = req.headers['stripe-signature'];
      if (!Buffer.isBuffer(payload) || typeof signature !== 'string' || !signature) {
        return res.status(400).json({ received: false, error: 'Invalid webhook signature' });
      }

      let event;
      try {
        event = constructStripeEvent(payload, signature, config.webhookSecret);
      } catch (err) {
        const error = err?.code === 'payload_invalid'
          ? 'Invalid webhook payload'
          : 'Invalid webhook signature';
        return res.status(400).json({ received: false, error });
      }

      if (typeof event.id !== 'string' || !event.id) {
        return res.status(400).json({ received: false, error: 'Invalid webhook payload' });
      }
      eventId = event.id;

      if (!FULFILLMENT_EVENTS.has(event.type)) {
        return res.status(200).json({ received: true, ignored: true });
      }

      const sessionId = event.data?.object?.id;
      if (typeof sessionId !== 'string' || !SESSION_ID_RE.test(sessionId)) {
        return res.status(400).json({ received: false, error: 'Invalid webhook payload' });
      }

      let session;
      try {
        session = await retrieveSession(sessionId, config.secretKey);
      } catch (err) {
        console.error('SafeDelete webhook retrieve failed', eventId, err.code || err.name || 'error');
        return res.status(500).json({ received: false, error: 'Temporary failure' });
      }

      if (!session || session.id !== sessionId || event.livemode !== session.livemode) {
        console.info('SafeDelete webhook ignored', eventId, 'session_mismatch');
        return res.status(200).json({ received: true, ignored: true });
      }

      const verdict = evaluateCheckoutSession(session, config);
      if (!verdict.ok) {
        if (verdict.retry) {
          console.error('SafeDelete webhook retry', eventId, verdict.reason);
          return res.status(500).json({ received: false, error: 'Temporary failure' });
        }
        console.info('SafeDelete webhook ignored', eventId, verdict.reason);
        return res.status(200).json({ received: true, ignored: true });
      }

      const pool = typeof getPool === 'function' ? getPool() : null;
      if (!pool) {
        return res.status(500).json({ received: false, error: 'Temporary failure' });
      }

      let outcome;
      try {
        outcome = await fulfillPaidSession(pool, {
          stripeEventId: event.id,
          checkoutSessionId: sessionId,
          paymentIntentId: verdict.paymentIntentId,
          paymentLinkId: verdict.paymentLinkId,
          priceId: verdict.priceId,
          productId: verdict.productId,
          amountTotal: verdict.amountTotal,
          currency: verdict.currency,
          customerEmail: verdict.email,
          customerName: verdict.name,
          livemode: session.livemode === true,
        }, config, {
          sendDownloadEmail,
          sendAdminNotice,
          checkoutSessionId: sessionId,
        });
      } catch (err) {
        console.error('SafeDelete webhook delivery failed', eventId, err.code || err.name || 'error');
        return res.status(500).json({ received: false, error: 'Temporary failure' });
      }

      if (outcome.duplicate) {
        return res.status(200).json({ received: true, duplicate: true });
      }
      if (outcome.recovered) {
        return res.status(200).json({ received: true, recovered: true });
      }
      return res.status(200).json({ received: true, recorded: true });
    } catch (err) {
      console.error('SafeDelete webhook failed', eventId, err.code || err.name || 'error');
      if (!res.headersSent) {
        return res.status(500).json({ received: false, error: 'Temporary failure' });
      }
      return undefined;
    }
  };
}

const DOWNLOAD_UNAVAILABLE = 'Download is temporarily unavailable.';
const DOWNLOAD_INVALID = 'This download link is invalid or has expired.';

function readFirstChunk(stream) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      stream.off('error', onError);
      stream.off('readable', onReadable);
      stream.off('end', onEnd);
    };
    const onError = (err) => {
      cleanup();
      reject(err);
    };
    const onReadable = () => {
      const chunk = stream.read();
      if (chunk === null) return;
      cleanup();
      resolve(chunk);
    };
    const onEnd = () => {
      cleanup();
      resolve(null);
    };
    stream.on('error', onError);
    stream.on('readable', onReadable);
    stream.on('end', onEnd);
  });
}

async function releaseDownloadQuietly(pool, tokenHash) {
  try {
    await releaseDownload(pool, tokenHash);
  } catch (err) {
    console.error('SafeDelete download release failed', err.code || err.name || 'error');
  }
}

export function createSafeDeleteDownloadHandler(options = {}) {
  const getConfig = options.getConfig || (() => readSafeDeleteConfig());
  const getPool = options.getPool || (() => null);
  const openVolumeZip = options.openVolumeZip || openConfiguredZip;

  return async function safedeleteDownload(req, res) {
    const token = typeof req.query?.token === 'string' ? req.query.token.trim() : '';
    if (!token || token.length > 200) {
      return res.status(404).type('text/plain').send(DOWNLOAD_INVALID);
    }

    try {
      const config = getConfig();
      const pool = typeof getPool === 'function' ? getPool() : null;
      if (!pool) {
        return res.status(500).type('text/plain').send(DOWNLOAD_UNAVAILABLE);
      }

      let opened;
      try {
        opened = await openVolumeZip(config);
      } catch (err) {
        console.error('SafeDelete download file failed', err.code || err.name || 'error');
        return res.status(500).type('text/plain').send(DOWNLOAD_UNAVAILABLE);
      }

      const tokenHash = hashDownloadToken(token);
      const redeemed = await redeemDownload(pool, tokenHash);
      if (!redeemed) {
        return res.status(404).type('text/plain').send(DOWNLOAD_INVALID);
      }

      let stream;
      try {
        stream = opened.createStream();
      } catch (err) {
        console.error('SafeDelete download open failed', err.code || err.name || 'error');
        await releaseDownload(pool, tokenHash);
        return res.status(500).type('text/plain').send(DOWNLOAD_UNAVAILABLE);
      }

      let firstChunk;
      try {
        firstChunk = await readFirstChunk(stream);
      } catch (err) {
        console.error('SafeDelete download stream failed', err.code || err.name || 'error');
        stream.destroy();
        await releaseDownloadQuietly(pool, tokenHash);
        return res.status(500).type('text/plain').send(DOWNLOAD_UNAVAILABLE);
      }
      if (!firstChunk) {
        await releaseDownloadQuietly(pool, tokenHash);
        return res.status(500).type('text/plain').send(DOWNLOAD_UNAVAILABLE);
      }

      res.status(200);
      res.set({
        'Content-Type': 'application/zip',
        'Content-Length': String(opened.size),
        'Content-Disposition': `attachment; filename="${DEFAULT_ZIP_NAME}"`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      });
      res.write(firstChunk);

      try {
        await pipeline(stream, res);
      } catch (err) {
        console.error('SafeDelete download stream failed', err.code || err.name || 'error');
        if (!res.writableEnded) res.destroy();
      }
      return undefined;
    } catch (err) {
      console.error('SafeDelete download failed', err.code || err.name || 'error');
      if (!res.headersSent) {
        return res.status(500).type('text/plain').send(DOWNLOAD_UNAVAILABLE);
      }
      return undefined;
    }
  };
}

export function mountSafeDeleteWebhook(app, options = {}) {
  app.post(
    WEBHOOK_PATH,
    express.raw({ type: 'application/json', limit: '1mb' }),
    createSafeDeleteWebhookHandler(options)
  );
}

export function mountPaymentWebhook(app, options = {}) {
  const getConfig = options.getConfig || (() => readSafeDeleteConfig());
  const missing = missingPaymentSettings(getConfig());
  if (missing.length > 0) {
    console.error('SafeDelete payment webhook disabled', missing.join(' '));
    app.post(WEBHOOK_PATH, (_req, res) => {
      res.status(503).json({ received: false, error: 'Webhook is not configured' });
    });
    return { enabled: false };
  }
  mountSafeDeleteWebhook(app, { ...options, getConfig });
  return { enabled: true };
}

export function mountSafeDeleteDownload(app, options = {}) {
  app.get(DOWNLOAD_PATH, createSafeDeleteDownloadHandler(options));
}
