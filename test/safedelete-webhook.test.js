import assert from 'node:assert/strict';
import crypto from 'crypto';
import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { Readable } from 'node:stream';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import express from 'express';
import {
  DOWNLOAD_PATH,
  configError,
  ensureSafeDeletePurchases,
  hashDownloadToken,
  initializePaymentDatabase,
  missingPaymentSettings,
  mountPaymentWebhook,
  mountSafeDeleteDownload,
  resolvePrivateZip,
  retrieveCheckoutSession,
  sendSafeDeleteAdminNotice,
  sendSafeDeleteDownloadEmail,
  WEBHOOK_PATH,
} from '../server/safedeleteDelivery.js';

const CONFIG = {
  secretKey: 'sk_test_phase1',
  webhookSecret: 'whsec_test_secret',
  paymentLinkId: 'plink_safedelete_pro',
  priceId: 'price_safedelete_pro_5',
  productId: 'prod_safedelete_pro',
  currency: 'usd',
  unitAmount: 500,
  productCode: 'safedelete-pro',
  tokenTtlHours: 72,
  downloadLimit: 5,
  downloadBaseUrl: 'https://devndespro-production.up.railway.app',
  volumeRoot: path.resolve('/data/safedelete'),
  zipPath: path.resolve('/data/safedelete/DevnDespro-SafeDelete-Pro.zip'),
  zeptoToken: 'test-zepto-token',
  fromAddress: 'hello@devndespro.com',
  toAddress: 'hello@devndespro.com',
  zeptoApiUrl: 'https://api.zeptomail.com/v1.1/email',
};

function paidSession(overrides = {}) {
  const session = {
    id: 'cs_valid',
    object: 'checkout.session',
    mode: 'payment',
    status: 'complete',
    payment_status: 'paid',
    payment_link: CONFIG.paymentLinkId,
    payment_intent: 'pi_valid',
    amount_total: 500,
    currency: 'usd',
    livemode: false,
    customer_details: { email: 'buyer@example.com', name: 'A Buyer' },
    metadata: { product: 'safedelete-pro' },
    line_items: {
      object: 'list',
      data: [
        {
          quantity: 1,
          amount_discount: 0,
          amount_total: 500,
          currency: 'usd',
          price: {
            id: CONFIG.priceId,
            object: 'price',
            currency: 'usd',
            unit_amount: 500,
            type: 'one_time',
            product: CONFIG.productId,
          },
        },
      ],
    },
  };

  return {
    ...session,
    ...overrides,
    customer_details: {
      ...session.customer_details,
      ...(overrides.customer_details || {}),
    },
    metadata: overrides.metadata === undefined ? session.metadata : overrides.metadata,
    line_items: overrides.line_items || session.line_items,
  };
}

function withPrice(priceOverrides, itemOverrides = {}, sessionOverrides = {}) {
  const session = paidSession(sessionOverrides);
  const item = session.line_items.data[0];
  return {
    ...session,
    line_items: {
      object: 'list',
      data: [
        {
          ...item,
          ...itemOverrides,
          price: { ...item.price, ...priceOverrides },
        },
      ],
    },
  };
}

function stripeEvent({ id, type = 'checkout.session.completed', sessionId, livemode = false }) {
  return {
    id,
    object: 'event',
    type,
    livemode,
    data: {
      object: {
        id: sessionId,
        object: 'checkout.session',
      },
    },
  };
}

function signPayload(payload, secret, timestamp = Math.floor(Date.now() / 1000)) {
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`, 'utf8')
    .digest('hex');
  return { timestamp, signature, header: `t=${timestamp},v1=${signature}` };
}

function uniqueViolation(name) {
  const error = new Error(`duplicate key value violates unique constraint "${name}"`);
  error.code = '23505';
  return error;
}

function copyRow(row) {
  return { ...row };
}

// Enforces the purchase unique keys and atomic download claim without touching Railway.
function createPurchasePool() {
  const rows = [];
  let nextId = 1;
  return {
    rows,
    async query(sql, params = []) {
      if (/CREATE TABLE|ALTER TABLE|CREATE UNIQUE INDEX/i.test(sql)) {
        return { rows: [], rowCount: 0 };
      }
      if (sql.includes('safedelete:insert')) {
        const [
          stripeEventId,
          checkoutSessionId,
          paymentIntentId,
          paymentLinkId,
          priceId,
          productId,
          amountTotal,
          currency,
          customerEmail,
          customerName,
          livemode,
          tokenHash,
          deliveryToken,
          tokenExpiresAt,
          downloadLimit,
        ] = params;
        if (rows.some((row) => row.stripe_event_id === stripeEventId)) {
          return { rows: [], rowCount: 0 };
        }
        if (rows.some((row) => row.checkout_session_id === checkoutSessionId)) {
          throw uniqueViolation('safedelete_purchases_checkout_session_id_key');
        }
        if (rows.some((row) => row.token_hash === tokenHash)) {
          throw uniqueViolation('safedelete_purchases_token_hash_uidx');
        }
        const row = {
          id: nextId++,
          stripe_event_id: stripeEventId,
          checkout_session_id: checkoutSessionId,
          payment_intent_id: paymentIntentId,
          payment_link_id: paymentLinkId,
          price_id: priceId,
          product_id: productId,
          amount_total: amountTotal,
          currency,
          customer_email: customerEmail,
          customer_name: customerName,
          livemode,
          token_hash: tokenHash,
          delivery_token: deliveryToken,
          token_expires_at: tokenExpiresAt,
          download_count: 0,
          download_limit: downloadLimit,
          email_sent_at: null,
          email_claimed_at: null,
        };
        rows.push(row);
        return {
          rows: [{
            id: row.id,
            delivery_token: row.delivery_token,
            token_expires_at: row.token_expires_at,
            customer_email: row.customer_email,
            customer_name: row.customer_name,
            email_sent_at: row.email_sent_at,
          }],
          rowCount: 1,
        };
      }
      if (sql.includes('safedelete:load')) {
        const [eventId, sessionId] = params;
        const row = rows.find((item) => item.stripe_event_id === eventId || item.checkout_session_id === sessionId);
        return { rows: row ? [copyRow(row)] : [], rowCount: row ? 1 : 0 };
      }
      if (sql.includes('safedelete:by-id')) {
        const row = rows.find((item) => item.id === params[0]);
        return { rows: row ? [{ email_sent_at: row.email_sent_at }] : [], rowCount: row ? 1 : 0 };
      }
      if (sql.includes('safedelete:claim')) {
        const row = rows.find((item) => item.id === params[0]);
        const claimedAt = row?.email_claimed_at ? new Date(row.email_claimed_at).getTime() : null;
        const claimFree = claimedAt == null || Date.now() - claimedAt >= 5 * 60 * 1000;
        if (!row || row.email_sent_at || !row.delivery_token || !claimFree) {
          return { rows: [], rowCount: 0 };
        }
        row.email_claimed_at = new Date().toISOString();
        return { rows: [copyRow(row)], rowCount: 1 };
      }
      if (sql.includes('safedelete:release-download')) {
        const row = rows.find((item) => item.token_hash === params[0] && item.download_count > 0);
        if (row) row.download_count -= 1;
        return { rows: [], rowCount: row ? 1 : 0 };
      }
      if (sql.includes('safedelete:release')) {
        const row = rows.find((item) => item.id === params[0] && !item.email_sent_at);
        if (row) row.email_claimed_at = null;
        return { rows: [], rowCount: row ? 1 : 0 };
      }
      if (sql.includes('safedelete:mark-sent')) {
        const row = rows.find((item) => item.id === params[0]);
        if (row) {
          row.email_sent_at = new Date().toISOString();
          row.delivery_token = null;
          row.email_claimed_at = null;
        }
        return { rows: [], rowCount: row ? 1 : 0 };
      }
      if (sql.includes('safedelete:redeem')) {
        const now = Date.now();
        const row = rows.find((item) => item.token_hash === params[0]
          && new Date(item.token_expires_at).getTime() > now
          && item.download_count < item.download_limit);
        if (!row) return { rows: [], rowCount: 0 };
        row.download_count += 1;
        return { rows: [{ id: row.id }], rowCount: 1 };
      }
      if (/FROM safedelete_purchases/i.test(sql)) {
        return { rows: rows.map(copyRow), rowCount: rows.length };
      }
      throw new Error(`Unexpected SQL: ${sql}`);
    },
    async end() {},
  };
}

async function withApp(sessions, fn, hooks = {}) {
  const pool = createPurchasePool();
  await ensureSafeDeletePurchases(pool);
  const calls = [];
  const emails = [];
  const app = express();
  mountPaymentWebhook(app, {
    getPool: () => pool,
    getConfig: () => CONFIG,
    retrieveSession: async (sessionId, secretKey) => {
      calls.push({ sessionId, secretKey });
      const session = sessions[sessionId];
      if (!session) {
        const error = new Error('Stripe session retrieve failed');
        error.code = 'stripe_404';
        throw error;
      }
      return session;
    },
    sendDownloadEmail: hooks.sendDownloadEmail || (async (payload) => {
      emails.push(payload);
    }),
    sendAdminNotice: hooks.sendAdminNotice || (async () => {}),
  });
  mountSafeDeleteDownload(app, {
    getPool: () => pool,
    getConfig: () => CONFIG,
    openVolumeZip: hooks.openVolumeZip || (async () => ({
      size: Buffer.byteLength('PK-fake-zip'),
      createStream: () => Readable.from(Buffer.from('PK-fake-zip')),
    })),
  });
  app.use(express.json({ limit: '1mb' }));

  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    await fn({ port: server.address().port, pool, calls, emails });
  } finally {
    if (typeof server.closeAllConnections === 'function') server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
    await pool.end();
  }
}

function postRaw(port, { body, signature }) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path: WEBHOOK_PATH,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          'Stripe-Signature': signature,
          Connection: 'close',
        },
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            json: JSON.parse(Buffer.concat(chunks).toString('utf8')),
          });
        });
      }
    );
    req.on('error', reject);
    req.end(body);
  });
}

async function postSigned({ port, event, secret = CONFIG.webhookSecret, body, header }) {
  const payload = JSON.stringify(event);
  const signed = signPayload(payload, secret);
  const sentBody = body === undefined ? payload : body;
  const result = await postRaw(port, {
    body: sentBody,
    signature: header || signed.header,
  });
  return { ...result, payload, signed };
}

function requestRaw(port, path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path,
        method: 'GET',
        headers: { Connection: 'close' },
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            location: res.headers.location,
            headers: res.headers,
            body: Buffer.concat(chunks).toString('utf8'),
          });
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

function tokenFromEmail(payload) {
  return new URL(payload.downloadUrl).searchParams.get('token');
}

async function purchases(pool) {
  const result = await pool.query(
    'SELECT stripe_event_id, checkout_session_id, payment_link_id, price_id, product_id, amount_total, currency, customer_email, livemode FROM safedelete_purchases ORDER BY id'
  );
  return result.rows;
}

describe('SafeDelete Pro webhook', () => {
  it('retrieves Checkout Session line items from Stripe', async () => {
    const originalFetch = global.fetch;
    let seen = null;
    global.fetch = async (url, options) => {
      seen = {
        url: String(url),
        authorization: options.headers.Authorization,
      };
      return {
        ok: true,
        async json() {
          return { id: 'cs_valid' };
        },
      };
    };
    try {
      const session = await retrieveCheckoutSession('cs_valid', CONFIG.secretKey);
      assert.equal(session.id, 'cs_valid');
      assert.match(seen.url, /^https:\/\/api\.stripe\.com\/v1\/checkout\/sessions\/cs_valid\?/);
      assert.match(seen.url, /expand(?:%5B%5D|\[\])=line_items/);
      assert.equal(seen.authorization, `Bearer ${CONFIG.secretKey}`);
    } finally {
      global.fetch = originalFetch;
    }
  });

  it('keeps JSON parsing for routes mounted after the webhook', async () => {
    const app = express();
    mountPaymentWebhook(app, {
      getPool: () => createPurchasePool(),
      getConfig: () => CONFIG,
    });
    app.use(express.json({ limit: '1mb' }));
    app.post('/api/contact', (req, res) => {
      res.status(200).json({ ok: req.body?.name === 'Ada' });
    });
    const server = app.listen(0, '127.0.0.1');
    await once(server, 'listening');
    try {
      const body = JSON.stringify({ name: 'Ada' });
      const result = await new Promise((resolve, reject) => {
        const req = http.request(
          {
            hostname: '127.0.0.1',
            port: server.address().port,
            path: '/api/contact',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(body),
              Connection: 'close',
            },
          },
          (res) => {
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
              resolve({
                status: res.statusCode,
                json: JSON.parse(Buffer.concat(chunks).toString('utf8')),
              });
            });
          }
        );
        req.on('error', reject);
        req.end(body);
      });
      assert.equal(result.status, 200);
      assert.deepEqual(result.json, { ok: true });
    } finally {
      if (typeof server.closeAllConnections === 'function') server.closeAllConnections();
      await new Promise((resolve) => server.close(resolve));
    }
  });

  it('registers the raw-body webhook before JSON parsing', () => {
    const serverPath = fileURLToPath(new URL('../server.js', import.meta.url));
    const deliveryPath = fileURLToPath(new URL('../server/safedeleteDelivery.js', import.meta.url));
    const source = readFileSync(serverPath, 'utf8');
    const delivery = readFileSync(deliveryPath, 'utf8');
    const webhookAt = source.indexOf('mountPaymentWebhook(');
    const jsonAt = source.indexOf("app.use(express.json({ limit: '1mb' }))");
    const databaseAt = source.indexOf('await initializePaymentDatabase(databaseUrl, dbPool)');
    const listenAt = source.indexOf('app.listen(port');
    assert.ok(webhookAt > 0);
    assert.ok(jsonAt > webhookAt);
    assert.ok(databaseAt > 0);
    assert.ok(listenAt > databaseAt);
    assert.match(source, /process\.exit\(1\)/);
    assert.match(source, /SafeDelete purchases table initialization failed', error\.code/);
    assert.doesNotMatch(source, /\.finally\(\(\) =>/);
    assert.match(source, /app\.post\('\/api\/contact'/);
    assert.match(source, /app\.get\('\/api\/health'/);
    assert.match(delivery, /express\.raw\(\{ type: 'application\/json'/);
    assert.match(delivery, /ON CONFLICT \(stripe_event_id\) DO NOTHING/);
    assert.match(delivery, /checkout_session_id TEXT NOT NULL UNIQUE/);
    assert.match(source, /mountSafeDeleteDownload\(/);
    assert.match(delivery, /Zoho-enczapikey/);
    assert.match(delivery, /SAFEDELETE_ZIP_PATH/);
    assert.doesNotMatch(delivery, /r2\.cloudflarestorage|R2_ACCOUNT_ID|presignR2/);
    assert.doesNotMatch(delivery, /express\.static|public\//);
  });

  it('records a paid $5 Payment Link checkout', async () => {
    const session = paidSession();
    await withApp({ cs_valid: session }, async ({ port, pool, calls }) => {
      const result = await postSigned({
        port,
        event: stripeEvent({ id: 'evt_valid', sessionId: 'cs_valid' }),
      });

      assert.equal(result.status, 200);
      assert.deepEqual(result.json, { received: true, recorded: true });
      assert.deepEqual(calls, [{ sessionId: 'cs_valid', secretKey: CONFIG.secretKey }]);

      const rows = await purchases(pool);
      assert.equal(rows.length, 1);
      assert.equal(rows[0].stripe_event_id, 'evt_valid');
      assert.equal(rows[0].checkout_session_id, 'cs_valid');
      assert.equal(rows[0].payment_link_id, CONFIG.paymentLinkId);
      assert.equal(rows[0].price_id, CONFIG.priceId);
      assert.equal(rows[0].product_id, CONFIG.productId);
      assert.equal(Number(rows[0].amount_total), 500);
      assert.equal(rows[0].currency, 'usd');
      assert.equal(rows[0].customer_email, 'buyer@example.com');
      assert.equal(rows[0].livemode, false);
    });
  });

  it('records a delayed payment after async_payment_succeeded', async () => {
    const session = paidSession({ id: 'cs_async' });
    await withApp({ cs_async: session }, async ({ port, pool }) => {
      const result = await postSigned({
        port,
        event: stripeEvent({
          id: 'evt_async',
          type: 'checkout.session.async_payment_succeeded',
          sessionId: 'cs_async',
        }),
      });
      assert.equal(result.status, 200);
      assert.equal(result.json.recorded, true);
      assert.equal((await purchases(pool)).length, 1);
    });
  });

  it('rejects an invalid signature and stores nothing', async () => {
    await withApp({ cs_valid: paidSession() }, async ({ port, pool, calls }) => {
      const event = stripeEvent({ id: 'evt_bad_sig', sessionId: 'cs_valid' });
      const wrongSecret = await postSigned({
        port,
        event,
        secret: `${CONFIG.webhookSecret}_wrong`,
      });
      const payload = JSON.stringify(event);
      const tampered = await postSigned({ port, event, body: `${payload} ` });
      const staleTime = Math.floor(Date.now() / 1000) - 3600;
      const stale = signPayload(payload, CONFIG.webhookSecret, staleTime);
      const staleResponse = await postRaw(port, { body: payload, signature: stale.header });

      assert.equal(wrongSecret.status, 400);
      assert.deepEqual(wrongSecret.json, { received: false, error: 'Invalid webhook signature' });
      assert.equal(tampered.status, 400);
      assert.equal(staleResponse.status, 400);
      assert.equal(calls.length, 0);
      assert.equal((await purchases(pool)).length, 0);
    });
  });

  it('ignores a different payment link and a different product', async () => {
    const wrongLink = paidSession({
      id: 'cs_wrong_link',
      payment_link: 'plink_monthly_plan',
    });
    const wrongProduct = withPrice(
      { product: 'prod_other' },
      {},
      { id: 'cs_wrong_product' }
    );
    await withApp(
      { cs_wrong_link: wrongLink, cs_wrong_product: wrongProduct },
      async ({ port, pool }) => {
        const linkResult = await postSigned({
          port,
          event: stripeEvent({ id: 'evt_wrong_link', sessionId: 'cs_wrong_link' }),
        });
        const productResult = await postSigned({
          port,
          event: stripeEvent({ id: 'evt_wrong_product', sessionId: 'cs_wrong_product' }),
        });

        assert.equal(linkResult.status, 200);
        assert.deepEqual(linkResult.json, { received: true, ignored: true });
        assert.equal(productResult.status, 200);
        assert.deepEqual(productResult.json, { received: true, ignored: true });
        assert.equal((await purchases(pool)).length, 0);
      }
    );
  });

  it('ignores an unpaid session', async () => {
    const session = paidSession({
      id: 'cs_unpaid',
      payment_status: 'unpaid',
      status: 'complete',
    });
    await withApp({ cs_unpaid: session }, async ({ port, pool }) => {
      const result = await postSigned({
        port,
        event: stripeEvent({ id: 'evt_unpaid', sessionId: 'cs_unpaid' }),
      });
      assert.equal(result.status, 200);
      assert.deepEqual(result.json, { received: true, ignored: true });
      assert.equal((await purchases(pool)).length, 0);
    });
  });

  it('ignores a paid USD total other than $5', async () => {
    const session = paidSession({
      id: 'cs_amount',
      amount_total: 1500,
    });
    session.line_items.data[0].price.unit_amount = 1500;
    session.line_items.data[0].amount_total = 1500;
    await withApp({ cs_amount: session }, async ({ port, pool }) => {
      const result = await postSigned({
        port,
        event: stripeEvent({ id: 'evt_amount', sessionId: 'cs_amount' }),
      });
      assert.equal(result.status, 200);
      assert.deepEqual(result.json, { received: true, ignored: true });
      assert.equal((await purchases(pool)).length, 0);
    });
  });

  it('stores one row when the same event or the same checkout session is delivered twice', async () => {
    await withApp(
      {
        cs_valid: paidSession(),
        cs_second: paidSession({ id: 'cs_second' }),
      },
      async ({ port, pool }) => {
        const event = stripeEvent({ id: 'evt_dup', sessionId: 'cs_valid' });
        const first = await postSigned({ port, event });
        const replay = await postSigned({ port, event });
        const sameSession = await postSigned({
          port,
          event: stripeEvent({ id: 'evt_dup_other', sessionId: 'cs_valid' }),
        });
        const secondPurchase = await postSigned({
          port,
          event: stripeEvent({ id: 'evt_second', sessionId: 'cs_second' }),
        });

        assert.deepEqual(first.json, { received: true, recorded: true });
        assert.deepEqual(replay.json, { received: true, duplicate: true });
        assert.deepEqual(sameSession.json, { received: true, duplicate: true });
        assert.deepEqual(secondPurchase.json, { received: true, recorded: true });

        const rows = await purchases(pool);
        assert.deepEqual(
          rows.map((row) => row.stripe_event_id),
          ['evt_dup', 'evt_second']
        );
        assert.deepEqual(
          rows.map((row) => row.checkout_session_id),
          ['cs_valid', 'cs_second']
        );
      }
    );
  });

  it('returns a generic error when the purchase insert fails', async () => {
    const pool = {
      async query() {
        const error = new Error('connection refused at production.internal');
        error.code = 'ECONNREFUSED';
        throw error;
      },
    };
    const app = express();
    mountPaymentWebhook(app, {
      getPool: () => pool,
      getConfig: () => CONFIG,
      retrieveSession: async () => paidSession(),
    });
    app.use(express.json({ limit: '1mb' }));
    const server = app.listen(0, '127.0.0.1');
    await once(server, 'listening');
    try {
      const result = await postSigned({
        port: server.address().port,
        event: stripeEvent({ id: 'evt_db', sessionId: 'cs_valid' }),
      });
      assert.equal(result.status, 500);
      assert.deepEqual(result.json, { received: false, error: 'Temporary failure' });
      assert.equal(JSON.stringify(result.json).includes('production.internal'), false);
    } finally {
      if (typeof server.closeAllConnections === 'function') server.closeAllConnections();
      await new Promise((resolve) => server.close(resolve));
    }
  });

  it('emails a 72-hour download link and streams the private ZIP', async () => {
    await withApp({ cs_valid: paidSession() }, async ({ port, pool, emails }) => {
      const result = await postSigned({
        port,
        event: stripeEvent({ id: 'evt_delivery', sessionId: 'cs_valid' }),
      });
      assert.deepEqual(result.json, { received: true, recorded: true });
      assert.equal(emails.length, 1);
      assert.equal(emails[0].to, 'buyer@example.com');
      assert.match(emails[0].downloadUrl, /^https:\/\/devndespro-production\.up\.railway\.app\/api\/safedelete-pro\/download\?token=/);

      const token = tokenFromEmail(emails[0]);
      const row = pool.rows[0];
      const hoursLeft = (new Date(row.token_expires_at).getTime() - Date.now()) / 3600000;
      assert.equal(row.delivery_token, null);
      assert.ok(row.email_sent_at);
      assert.equal(row.token_hash, hashDownloadToken(token));
      assert.equal(row.download_limit, 5);
      assert.ok(hoursLeft > 71.9 && hoursLeft < 72.1);

      const download = await requestRaw(port, `${DOWNLOAD_PATH}?token=${encodeURIComponent(token)}`);
      assert.equal(download.status, 200);
      assert.equal(download.body, 'PK-fake-zip');
      assert.match(download.headers['content-disposition'], /attachment; filename="DevnDespro-SafeDelete-Pro.zip"/);
      assert.equal(download.headers['cache-control'], 'private, no-store');
      assert.equal(download.headers['content-type'], 'application/zip');
      assert.equal(row.download_count, 1);
    });
  });

  it('rejects an invalid or expired download token', async () => {
    await withApp({ cs_valid: paidSession() }, async ({ port, pool, emails }) => {
      await postSigned({
        port,
        event: stripeEvent({ id: 'evt_expire', sessionId: 'cs_valid' }),
      });
      const missing = await requestRaw(port, DOWNLOAD_PATH);
      const invalid = await requestRaw(port, `${DOWNLOAD_PATH}?token=not-a-real-token`);
      pool.rows[0].token_expires_at = new Date(Date.now() - 60 * 1000).toISOString();
      const expired = await requestRaw(
        port,
        `${DOWNLOAD_PATH}?token=${encodeURIComponent(tokenFromEmail(emails[0]))}`
      );

      assert.equal(missing.status, 404);
      assert.equal(invalid.status, 404);
      assert.equal(expired.status, 404);
      assert.equal(missing.body, 'This download link is invalid or has expired.');
      assert.equal(pool.rows[0].download_count, 0);
    });
  });

  it('stops after five downloads', async () => {
    await withApp({ cs_valid: paidSession() }, async ({ port, pool, emails }) => {
      await postSigned({
        port,
        event: stripeEvent({ id: 'evt_limit', sessionId: 'cs_valid' }),
      });
      const path = `${DOWNLOAD_PATH}?token=${encodeURIComponent(tokenFromEmail(emails[0]))}`;
      for (let attempt = 1; attempt <= 5; attempt += 1) {
        const response = await requestRaw(port, path);
        assert.equal(response.status, 200);
      }
      const blocked = await requestRaw(port, path);
      assert.equal(blocked.status, 404);
      assert.equal(pool.rows[0].download_count, 5);
    });
  });

  it('keeps the same download token when email fails and retries', async () => {
    let attempts = 0;
    const sent = [];
    await withApp({ cs_valid: paidSession() }, async ({ port, pool }) => {
      const event = stripeEvent({ id: 'evt_retry_mail', sessionId: 'cs_valid' });
      const failed = await postSigned({ port, event });
      assert.equal(failed.status, 500);
      assert.deepEqual(failed.json, { received: false, error: 'Temporary failure' });
      assert.equal(JSON.stringify(failed.json).includes('zepto'), false);
      assert.ok(pool.rows[0].delivery_token);
      assert.equal(pool.rows[0].email_sent_at, null);

      const recovered = await postSigned({ port, event });
      assert.equal(recovered.status, 200);
      assert.deepEqual(recovered.json, { received: true, recovered: true });
      assert.equal(sent.length, 2);
      assert.equal(sent[0], sent[1]);
      assert.equal(pool.rows[0].delivery_token, null);
      assert.ok(pool.rows[0].email_sent_at);

      const download = await requestRaw(port, `${DOWNLOAD_PATH}?token=${encodeURIComponent(tokenFromEmail({ downloadUrl: sent[1] }))}`);
      assert.equal(download.status, 200);
      assert.equal(download.body, 'PK-fake-zip');
    }, {
      sendDownloadEmail: async (payload) => {
        attempts += 1;
        sent.push(payload.downloadUrl);
        if (attempts === 1) {
          const error = new Error('mailbox unavailable');
          error.code = 'zepto_503';
          throw error;
        }
      },
    });
  });

  it('sends one download email when the same payment is delivered concurrently', async () => {
    let emailCount = 0;
    await withApp({ cs_valid: paidSession() }, async ({ port, pool }) => {
      const event = stripeEvent({ id: 'evt_parallel', sessionId: 'cs_valid' });
      const results = await Promise.all([
        postSigned({ port, event }),
        postSigned({ port, event }),
      ]);
      assert.equal(emailCount, 1);
      assert.equal(pool.rows.length, 1);
      assert.ok(results.some((result) => result.status === 200 && result.json.recorded === true));
      assert.ok(results.every((result) => result.status === 200 || result.status === 500));

      const replay = await postSigned({ port, event });
      assert.deepEqual(replay.json, { received: true, duplicate: true });
      assert.equal(emailCount, 1);
    }, {
      sendDownloadEmail: async () => {
        emailCount += 1;
        await new Promise((resolve) => setImmediate(resolve));
      },
    });
  });

  it('still records delivery when the internal purchase notice fails', async () => {
    await withApp({ cs_valid: paidSession() }, async ({ port }) => {
      const result = await postSigned({
        port,
        event: stripeEvent({ id: 'evt_notice', sessionId: 'cs_valid' }),
      });
      assert.equal(result.status, 200);
      assert.equal(result.json.recorded, true);
    }, {
      sendAdminNotice: async () => {
        const error = new Error('notice failed');
        error.code = 'zepto_500';
        throw error;
      },
    });
  });

  it('sends the customer link through ZeptoMail without leaking a failed response', async () => {
    const originalFetch = global.fetch;
    const seen = [];
    global.fetch = async (url, options) => {
      seen.push({ url: String(url), authorization: options.headers.Authorization, body: JSON.parse(options.body) });
      if (seen.length === 1) {
        return { ok: false, status: 422, async text() { return 'buyer@example.com secret-body'; } };
      }
      return { ok: true, async text() { return ''; } };
    };
    try {
      const payload = {
        to: 'buyer@example.com',
        name: 'A <Buyer>',
        downloadUrl: 'https://devndespro-production.up.railway.app/api/safedelete-pro/download?token=abc',
        config: CONFIG,
      };
      await assert.rejects(
        () => sendSafeDeleteDownloadEmail(payload),
        (err) => {
          assert.equal(err.code, 'zepto_422');
          assert.equal(String(err.message).includes('buyer@example.com'), false);
          assert.equal(String(err.message).includes('secret-body'), false);
          return true;
        }
      );
      await sendSafeDeleteDownloadEmail(payload);
      assert.equal(seen[1].authorization, 'Zoho-enczapikey test-zepto-token');
      assert.equal(seen[1].url, CONFIG.zeptoApiUrl);
      assert.equal(seen[1].body.to[0].email_address.address, 'buyer@example.com');
      assert.match(seen[1].body.htmlbody, /A &lt;Buyer&gt;/);
      assert.match(seen[1].body.htmlbody, /token=abc/);
      await sendSafeDeleteAdminNotice({
        email: 'buyer@example.com',
        checkoutSessionId: 'cs_valid',
        config: CONFIG,
      });
      assert.equal(seen[2].body.htmlbody.includes('token=abc'), false);
    } finally {
      global.fetch = originalFetch;
    }
  });

  it('reads only a ZIP inside the private volume', () => {
    const root = path.resolve('/data/safedelete');
    const zip = path.resolve('/data/safedelete/DevnDespro-SafeDelete-Pro.zip');
    const fsImpl = {
      realpathSync(candidate) {
        const resolved = path.resolve(candidate);
        if (resolved === root) return root;
        if (resolved === zip) return zip;
        const error = new Error('ENOENT');
        error.code = 'ENOENT';
        throw error;
      },
      statSync(candidate) {
        if (path.resolve(candidate) !== zip) {
          const error = new Error('ENOENT');
          error.code = 'ENOENT';
          throw error;
        }
        return { isFile: () => true, size: 24 };
      },
    };
    const located = resolvePrivateZip({ volumeRoot: root, zipPath: zip }, fsImpl);
    assert.equal(located.filePath, zip);
    assert.equal(located.size, 24);
    assert.throws(
      () => resolvePrivateZip({ volumeRoot: root, zipPath: path.resolve('/tmp/other.zip') }, fsImpl),
      (err) => err.code === 'storage_not_configured'
    );
    assert.throws(
      () => resolvePrivateZip({
        volumeRoot: path.resolve('/var/lib/postgresql/data'),
        zipPath: path.resolve('/var/lib/postgresql/data/DevnDespro-SafeDelete-Pro.zip'),
      }, fsImpl),
      (err) => err.code === 'storage_not_configured'
    );
  });

  it('does not consume a download when the volume file is missing', async () => {
    await withApp({ cs_valid: paidSession() }, async ({ port, pool, emails }) => {
      await postSigned({
        port,
        event: stripeEvent({ id: 'evt_missing_zip', sessionId: 'cs_valid' }),
      });
      const download = await requestRaw(
        port,
        `${DOWNLOAD_PATH}?token=${encodeURIComponent(tokenFromEmail(emails[0]))}`
      );
      assert.equal(download.status, 500);
      assert.equal(download.body, 'Download is temporarily unavailable.');
      assert.equal(pool.rows[0].download_count, 0);
    }, {
      openVolumeZip: async () => {
        const error = new Error('Download file is unavailable');
        error.code = 'storage_unavailable';
        throw error;
      },
    });
  });

  it('returns the download when streaming fails before any bytes are sent', async () => {
    await withApp({ cs_valid: paidSession() }, async ({ port, pool, emails }) => {
      await postSigned({
        port,
        event: stripeEvent({ id: 'evt_stream_fail', sessionId: 'cs_valid' }),
      });
      const download = await requestRaw(
        port,
        `${DOWNLOAD_PATH}?token=${encodeURIComponent(tokenFromEmail(emails[0]))}`
      );
      assert.equal(download.status, 500);
      assert.equal(pool.rows[0].download_count, 0);
      const retry = await requestRaw(
        port,
        `${DOWNLOAD_PATH}?token=${encodeURIComponent(tokenFromEmail(emails[0]))}`
      );
      assert.equal(retry.status, 500);
      assert.equal(pool.rows[0].download_count, 0);
    }, {
      openVolumeZip: async () => ({
        size: 4,
        createStream() {
          return new Readable({
            read() {
              this.destroy(Object.assign(new Error('read failed'), { code: 'EIO' }));
            },
          });
        },
      }),
    });
  });

  it('refuses to start when the purchases table cannot be created', async () => {
    const pool = {
      async query() {
        const error = new Error('postgres://app:super-secret-db@db.internal/railway');
        error.code = 'ECONNREFUSED';
        throw error;
      },
    };
    await assert.rejects(
      () => initializePaymentDatabase('postgres://app:super-secret-db@db.internal/railway', pool),
      (error) => {
        assert.equal(error.message, 'SafeDelete purchases table initialization failed');
        assert.equal(error.code, 'ECONNREFUSED');
        assert.doesNotMatch(`${error.message} ${error.code}`, /super-secret-db/);
        return true;
      }
    );
    await assert.rejects(
      () => initializePaymentDatabase('postgres://example', null),
      (error) => error.code === 'payment_db_missing'
    );
    await initializePaymentDatabase('', pool);
  });

  it('disables the payment webhook until Stripe and ZeptoMail are configured', async () => {
    const cases = [
      { zeptoToken: '', setting: 'ZOHO_ZEPTOMAIL_TOKEN' },
      { fromAddress: '   ', setting: 'ZOHO_FROM_EMAIL' },
      { secretKey: '', setting: 'STRIPE_SECRET_KEY' },
      { webhookSecret: '', setting: 'STRIPE_WEBHOOK_SECRET' },
      { paymentLinkId: '', setting: 'STRIPE_PAYMENT_LINK_ID' },
      { priceId: '', setting: 'STRIPE_PRICE_ID' },
      { productId: '', setting: 'STRIPE_PRODUCT_ID' },
    ];
    assert.equal(configError(CONFIG), null);
    assert.deepEqual(missingPaymentSettings(CONFIG), []);

    for (const item of cases) {
      const config = { ...CONFIG, ...item };
      delete config.setting;
      const logged = [];
      const originalError = console.error;
      console.error = (...args) => logged.push(args.map((value) => String(value)).join(' '));
      const pool = createPurchasePool();
      let retrieved = false;
      const app = express();
      let mounted;
      try {
        mounted = mountPaymentWebhook(app, {
          getPool: () => pool,
          getConfig: () => config,
          retrieveSession: async () => {
            retrieved = true;
            return paidSession();
          },
        });
      } finally {
        console.error = originalError;
      }
      app.use(express.json({ limit: '1mb' }));
      app.post('/api/contact', (req, res) => {
        res.status(200).json({ ok: req.body?.email === 'buyer@example.com' });
      });
      const server = app.listen(0, '127.0.0.1');
      await once(server, 'listening');
      try {
        assert.equal(configError(config), 'Webhook is not configured');
        assert.equal(mounted.enabled, false);
        assert.ok(missingPaymentSettings(config).includes(item.setting));
        const loggedText = logged.join('\n');
        assert.match(loggedText, new RegExp(item.setting));
        assert.doesNotMatch(loggedText, /whsec_test_secret|test-zepto-token|sk_test_phase1|plink_safedelete_pro/);

        const webhook = await postSigned({
          port: server.address().port,
          event: stripeEvent({ id: 'evt_disabled', sessionId: 'cs_valid' }),
        });
        assert.equal(webhook.status, 503);
        assert.deepEqual(webhook.json, { received: false, error: 'Webhook is not configured' });
        assert.equal(retrieved, false);
        assert.equal(pool.rows.length, 0);

        const contactBody = JSON.stringify({ email: 'buyer@example.com' });
        const contact = await new Promise((resolve, reject) => {
          const req = http.request(
            {
              hostname: '127.0.0.1',
              port: server.address().port,
              path: '/api/contact',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(contactBody),
                Connection: 'close',
              },
            },
            (res) => {
              const chunks = [];
              res.on('data', (chunk) => chunks.push(chunk));
              res.on('end', () => {
                resolve({
                  status: res.statusCode,
                  json: JSON.parse(Buffer.concat(chunks).toString('utf8')),
                });
              });
            }
          );
          req.on('error', reject);
          req.end(contactBody);
        });
        assert.equal(contact.status, 200);
        assert.deepEqual(contact.json, { ok: true });
      } finally {
        if (typeof server.closeAllConnections === 'function') server.closeAllConnections();
        await new Promise((resolve) => server.close(resolve));
      }
    }
  });

  it('does not let concurrent downloads exceed the five-download limit', async () => {
    await withApp({ cs_valid: paidSession() }, async ({ port, pool, emails }) => {
      await postSigned({
        port,
        event: stripeEvent({ id: 'evt_parallel_download', sessionId: 'cs_valid' }),
      });
      const downloadPath = `${DOWNLOAD_PATH}?token=${encodeURIComponent(tokenFromEmail(emails[0]))}`;
      const results = await Promise.all(Array.from({ length: 8 }, () => requestRaw(port, downloadPath)));
      const successes = results.filter((result) => result.status === 200);
      const blocked = results.filter((result) => result.status === 404);
      assert.equal(successes.length, 5);
      assert.equal(blocked.length, 3);
      assert.equal(pool.rows[0].download_count, 5);
    });
  });
});
