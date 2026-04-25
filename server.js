import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors({
  origin: ['https://www.devndespro.com', 'https://devndespro.com'],
  methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const host = String(req.headers.host || '').toLowerCase();
  if (host === 'devndespro.com' || host.startsWith('devndespro.com:')) {
    const redirectHost = host.replace(/^devndespro\.com/, 'www.devndespro.com');
    return res.redirect(301, `https://${redirectHost}${req.originalUrl}`);
  }
  return next();
});

const databaseUrl = process.env.DATABASE_URL;
const dbPool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false }
    })
  : null;

async function ensureLeadTable() {
  if (!dbPool) return;
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS contact_leads (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS blog_comments (
      id BIGSERIAL PRIMARY KEY,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      body TEXT NOT NULL,
      approved BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await dbPool.query(`
    CREATE INDEX IF NOT EXISTS idx_blog_comments_slug ON blog_comments(slug) WHERE approved = TRUE;
  `);
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS blog_likes (
      id BIGSERIAL PRIMARY KEY,
      slug TEXT NOT NULL,
      ip_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(slug, ip_hash)
    );
  `);
  await dbPool.query(`
    CREATE INDEX IF NOT EXISTS idx_blog_likes_slug ON blog_likes(slug);
  `);

  // ── New table for free audit leads ──────────────────────────────────
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS audit_leads (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      url TEXT NOT NULL,
      audit_score INTEGER,
      critical_count INTEGER,
      warning_count INTEGER,
      audit_data JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

const safe = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

async function sendViaZoho({ name, email, company, service, message }) {
  const zeptoTokenRaw = process.env.ZOHO_ZEPTOMAIL_TOKEN;
  const fromAddress = process.env.ZOHO_FROM_EMAIL;
  const toAddress =
    process.env.ZOHO_TO_EMAIL || process.env.CONTACT_TO_EMAIL || 'hello@devndespro.com';
  const apiUrl = process.env.ZOHO_ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email';

  if (!zeptoTokenRaw || !fromAddress || !toAddress) {
    throw new Error(
      'Server email is not configured. Set ZOHO_ZEPTOMAIL_TOKEN, ZOHO_FROM_EMAIL, and ZOHO_TO_EMAIL.'
    );
  }

  const zeptoToken = String(zeptoTokenRaw).replace(/^Zoho-enczapikey\s+/i, '');

  const subject = `New project inquiry: ${safe(name)}`;
  const htmlbody = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;">
      <h2 style="margin:0 0 12px;">New inquiry from devndespro.com</h2>
      <p><strong>Name:</strong> ${safe(name)}</p>
      <p><strong>Email:</strong> ${safe(email)}</p>
      <p><strong>Company:</strong> ${safe(company || 'N/A')}</p>
      <p><strong>Service:</strong> ${safe(service)}</p>
      <p><strong>Message:</strong><br>${safe(message).replace(/\n/g, '<br>')}</p>
    </div>
  `;

  const zohoResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Zoho-enczapikey ${zeptoToken}`
    },
    body: JSON.stringify({
      from: { address: fromAddress, name: 'devndespro Website' },
      to: [{ email_address: { address: toAddress, name: 'devndespro' } }],
      reply_to: [{ address: email, name }],
      subject,
      htmlbody
    })
  });

  if (!zohoResponse.ok) {
    const details = await zohoResponse.text();
    throw new Error(`Zoho send failed: ${details}`);
  }

  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Zoho-enczapikey ${zeptoToken}`
    },
    body: JSON.stringify({
      from: { address: fromAddress, name: 'devndespro' },
      to: [{ email_address: { address: email, name } }],
      subject: `We received your message, ${name}!`,
      htmlbody: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;max-width:600px;">
          <h2 style="color:#FF6B2B;">Thanks for reaching out, ${safe(name)}!</h2>
          <p>We've received your inquiry and will get back to you within <strong>24 hours</strong>.</p>
          <p>Here's a summary of what you sent us:</p>
          <p><strong>Service:</strong> ${safe(service)}</p>
          <p><strong>Message:</strong><br>${safe(message).replace(/\n/g, '<br>')}</p>
          <br>
          <p>Talk soon,<br><strong>Mahadevan</strong><br>devndespro</p>
          <p style="color:#888;font-size:12px;">Stavanger, Norway · hello@devndespro.com</p>
        </div>
      `
    })
  });
}

// ─── Free Audit Email Sender ─────────────────────────────────────────────────
async function sendAuditEmails({ name, email, url, score, critical, warnings, topIssues }) {
  const zeptoTokenRaw = process.env.ZOHO_ZEPTOMAIL_TOKEN;
  const fromAddress = process.env.ZOHO_FROM_EMAIL;
  const apiUrl = process.env.ZOHO_ZEPTOMAIL_API_URL || 'https://api.zeptomail.com/v1.1/email';

  if (!zeptoTokenRaw || !fromAddress) return;

  const zeptoToken = String(zeptoTokenRaw).replace(/^Zoho-enczapikey\s+/i, '');

  const healthColor = score >= 80 ? '#16A34A' : score >= 60 ? '#D97706' : '#DC2626';
  const domain = (() => { try { return new URL(url).hostname } catch { return url } })();

  const topIssuesHtml = (topIssues || []).slice(0, 3).map(issue => `
    <div style="padding:12px 16px;border-left:3px solid #DC2626;background:#FEF2F2;border-radius:0 8px 8px 0;margin-bottom:10px;">
      <div style="font-size:13px;font-weight:600;color:#DC2626;">⚠ ${safe(issue.title || issue.check || 'Issue found')}</div>
      <div style="font-size:12px;color:#6B7280;margin-top:4px;">${safe(issue.description || issue.message || '')}</div>
    </div>
  `).join('');

  // Email to visitor — summary only
  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Zoho-enczapikey ${zeptoToken}`
    },
    body: JSON.stringify({
      from: { address: fromAddress, name: 'devndespro SEO' },
      to: [{ email_address: { address: email, name } }],
      subject: `Your free SEO audit for ${domain} is ready`,
      htmlbody: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <div style="background:#1e1b2e;padding:28px 32px;text-align:center;">
              <img src="https://www.devndespro.com/images/DDDP_logo_mark.webp" alt="devndespro" style="height:44px;margin-bottom:12px;" />
              <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">Your Free SEO Audit Report</h1>
              <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">${safe(domain)}</p>
            </div>
            <div style="padding:32px;">
              <p style="font-size:15px;color:#374151;">Hi <strong>${safe(name)}</strong>,</p>
              <p style="font-size:14px;color:#6B7280;line-height:1.7;">Here's a summary of the SEO audit we ran on <strong>${safe(url)}</strong>.</p>

              <div style="text-align:center;margin:24px 0;">
                <div style="display:inline-block;background:#f8fafc;border-radius:50%;width:100px;height:100px;line-height:100px;font-size:32px;font-weight:800;color:${healthColor};border:4px solid ${healthColor};">${score}</div>
                <div style="font-size:13px;color:#6B7280;margin-top:8px;">Overall Health Score / 100</div>
              </div>

              <div style="display:flex;gap:12px;margin:20px 0;text-align:center;">
                <div style="flex:1;background:#FEF2F2;border-radius:8px;padding:16px;">
                  <div style="font-size:24px;font-weight:700;color:#DC2626;">${critical}</div>
                  <div style="font-size:12px;color:#6B7280;">Critical Issues</div>
                </div>
                <div style="flex:1;background:#FFFBEB;border-radius:8px;padding:16px;">
                  <div style="font-size:24px;font-weight:700;color:#D97706;">${warnings}</div>
                  <div style="font-size:12px;color:#6B7280;">Warnings</div>
                </div>
              </div>

              <h3 style="font-size:15px;font-weight:700;color:#111827;margin:24px 0 12px;">Top Issues Found:</h3>
              ${topIssuesHtml || '<p style="color:#6B7280;font-size:14px;">No critical issues found — great start!</p>'}

              <div style="background:#f8fafc;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
                <p style="font-size:14px;color:#374151;margin:0 0 16px;"><strong>Want the full report?</strong><br>Get all ${critical + warnings} issues with specific fix recommendations.</p>
                <a href="mailto:hello@devndespro.com?subject=Full SEO Report Request for ${encodeURIComponent(url)}&body=Hi Mahadevan, I'd like the full SEO report for ${encodeURIComponent(url)}. My name is ${encodeURIComponent(name)}."
                  style="display:inline-block;background:#FF6B2B;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
                  Request Full Report →
                </a>
              </div>

              <p style="font-size:12px;color:#9CA3AF;text-align:center;">
                devndespro · Web Development & SEO · Stavanger, Norway<br>
                <a href="https://www.devndespro.com" style="color:#FF6B2B;">www.devndespro.com</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    })
  });

  // Notify you with full details
  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Zoho-enczapikey ${zeptoToken}`
    },
    body: JSON.stringify({
      from: { address: fromAddress, name: 'devndespro Leads' },
      to: [{ email_address: { address: 'hello@devndespro.com', name: 'Mahadevan' } }],
      subject: `🔍 New Free Audit Lead: ${safe(name)} — ${safe(domain)}`,
      htmlbody: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;max-width:600px;">
          <h2 style="color:#FF6B2B;">New Free Audit Lead</h2>
          <p><strong>Name:</strong> ${safe(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${safe(email)}">${safe(email)}</a></p>
          <p><strong>URL:</strong> <a href="${safe(url)}">${safe(url)}</a></p>
          <p><strong>Score:</strong> ${score}/100</p>
          <p><strong>Critical:</strong> ${critical} | <strong>Warnings:</strong> ${warnings}</p>
          <p><a href="https://seo.devndespro.com" style="color:#FF6B2B;">View in SEO Tool →</a></p>
        </div>
      `
    })
  });
}

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'contact-api' });
});

app.post('/api/contact', async (req, res) => {
  const {
    name = '',
    email = '',
    company = '',
    service = '',
    message = '',
    website = ''
  } = req.body || {};

  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !service || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }

  try {
    if (dbPool) {
      await dbPool.query(
        `INSERT INTO contact_leads(name, email, company, service, message) VALUES ($1, $2, $3, $4, $5)`,
        [name, email, company || null, service, message]
      );
    }

    await sendViaZoho({ name, email, company, service, message });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Unexpected server error' });
  }
});

// ─── Free Audit Public Endpoint ──────────────────────────────────────────────
app.post('/api/free-audit', async (req, res) => {
  const { name = '', email = '', url = '', honeypot = '' } = req.body || {};

  if (honeypot) return res.status(200).json({ ok: true });

  if (!name.trim() || !email.trim() || !url.trim()) {
    return res.status(400).json({ ok: false, error: 'Name, email and URL are required.' });
  }

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address.' });
  }

  let auditUrl = url.trim();
  if (!auditUrl.startsWith('http')) auditUrl = `https://${auditUrl}`;

  try {
    // Run audit via SEO tool backend
    const SEO_BACKEND = process.env.SEO_BACKEND_URL || 'https://devndespro-seo-production.up.railway.app';
    const SEO_API_KEY = process.env.SEO_API_KEY || '';

    let auditResult = null;
    let score = 0;
    let critical = 0;
    let warnings = 0;
    let topIssues = [];

    try {
      const auditRes = await fetch(`${SEO_BACKEND}/api/public/audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': SEO_API_KEY,
        },
        body: JSON.stringify({ url: auditUrl }),
        signal: AbortSignal.timeout(45000),
      });

      if (auditRes.ok) {
        auditResult = await auditRes.json();
        score = auditResult?.score ?? 0;
        const checks = auditResult?.checks || [];
        critical = checks.filter(c => c.status === 'error').length;
        warnings = checks.filter(c => c.status === 'warning').length;
        topIssues = checks.filter(c => c.status === 'error').slice(0, 3);
      }
    } catch (auditErr) {
      console.error('Audit fetch error:', auditErr.message);
    }

    // Save to database
    if (dbPool) {
      await dbPool.query(
        `INSERT INTO audit_leads(name, email, url, audit_score, critical_count, warning_count, audit_data)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [name.trim(), email.trim(), auditUrl, score, critical, warnings, auditResult ? JSON.stringify(auditResult) : null]
      );
    }

    // Send emails
    await sendAuditEmails({ name: name.trim(), email: email.trim(), url: auditUrl, score, critical, warnings, topIssues });

    return res.status(200).json({ ok: true, score, critical, warnings });

  } catch (error) {
    console.error('Free audit error:', error.message);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' });
  }
});

// ─── Blog Comments API ───────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_RE  = /^[a-z0-9-]+$/;

app.get('/api/comments/:slug', async (req, res) => {
  const slug = String(req.params.slug || '');
  if (!SLUG_RE.test(slug)) return res.status(400).json({ ok: false, error: 'Invalid slug' });
  if (!dbPool) {
    return res.status(503).json({ ok: false, error: 'Database not configured' });
  }
  try {
    const result = await dbPool.query(
      `SELECT id, name, body, created_at FROM blog_comments
       WHERE slug = $1 AND approved = TRUE
       ORDER BY created_at ASC`,
      [slug]
    );
    return res.json({ ok: true, comments: result.rows });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Database error' });
  }
});

async function createComment(req, res, slugInput = '') {
  const {
    slug    = '',
    name    = '',
    email   = '',
    body    = '',
    website = ''
  } = req.body || {};

  if (website) return res.status(200).json({ ok: true });

  const slugClean = String(slugInput || slug).trim();
  const nameClean  = String(name).trim().slice(0, 120);
  const emailClean = String(email).trim().slice(0, 200);
  const bodyClean  = String(body).trim().slice(0, 2000);

  if (!SLUG_RE.test(slugClean))       return res.status(400).json({ ok: false, error: 'Invalid slug' });
  if (nameClean.length < 2)           return res.status(400).json({ ok: false, error: 'Name too short' });
  if (!EMAIL_RE.test(emailClean))     return res.status(400).json({ ok: false, error: 'Invalid email' });
  if (bodyClean.length < 10)          return res.status(400).json({ ok: false, error: 'Comment too short' });

  if (!dbPool) {
    return res.status(503).json({ ok: false, error: 'Database not configured' });
  }

  try {
    await dbPool.query(
      `INSERT INTO blog_comments(slug, name, email, body) VALUES ($1, $2, $3, $4)`,
      [slugClean, nameClean, emailClean, bodyClean]
    );
    return res.json({ ok: true, pending: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Database error' });
  }
}

app.post('/api/comments', async (req, res) => createComment(req, res));
app.post('/api/comments/:slug', async (req, res) => createComment(req, res, req.params.slug));

app.get('/api/likes/:slug', async (req, res) => {
  const slug = String(req.params.slug || '');
  if (!SLUG_RE.test(slug)) return res.status(400).json({ ok: false, error: 'Invalid slug' });
  if (!dbPool) {
    return res.status(503).json({ ok: false, error: 'Database not configured' });
  }
  try {
    const result = await dbPool.query(
      `SELECT COUNT(*) as count FROM blog_likes WHERE slug = $1`,
      [slug]
    );
    return res.json({ ok: true, count: parseInt(result.rows[0].count, 10) });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Database error' });
  }
});

async function createLike(req, res, slugInput = '') {
  const { slug = '' } = req.body || {};
  const slugClean = String(slugInput || slug).trim();

  if (!SLUG_RE.test(slugClean)) return res.status(400).json({ ok: false, error: 'Invalid slug' });

  if (!dbPool) {
    return res.status(503).json({ ok: false, error: 'Database not configured', count: 0 });
  }

  try {
    const ip = req.headers['cf-connecting-ip'] ||
               req.headers['x-forwarded-for']?.split(',')[0] ||
               req.socket.remoteAddress || 'unknown';

    const ipHash = crypto.createHash('sha256').update(ip + String(process.env.SECRET || 'default')).digest('hex');

    try {
      await dbPool.query(
        `INSERT INTO blog_likes(slug, ip_hash) VALUES ($1, $2)`,
        [slugClean, ipHash]
      );
    } catch (e) {
      // unique constraint — already liked
    }

    const result = await dbPool.query(
      `SELECT COUNT(*) as count FROM blog_likes WHERE slug = $1`,
      [slugClean]
    );
    const count = parseInt(result.rows[0].count, 10);
    return res.json({ ok: true, liked: true, count });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Database error', count: 0 });
  }
}

app.post('/api/likes', async (req, res) => createLike(req, res));
app.post('/api/likes/:slug', async (req, res) => createLike(req, res, req.params.slug));

const distPath = path.join(__dirname, 'dist');

app.get('/:slug.html', (req, res, next) => {
  const slug = String(req.params.slug || '').replace(/[^a-z0-9-]/gi, '').toLowerCase();
  if (!slug || slug === 'index' || slug === '404') {
    return next();
  }

  const seoFile = path.join(distPath, 'seo', `${slug}.html`);
  if (fs.existsSync(seoFile)) {
    return res.redirect(301, `/seo/${slug}.html`);
  }

  return next();
});

app.get('/blog', (_req, res) => {
  const blogIndexFile = path.join(distPath, 'blog', 'index.html');
  if (fs.existsSync(blogIndexFile)) {
    return res.sendFile(blogIndexFile);
  }
  return res.redirect(301, '/#blog');
});

app.get('/blog/:slug', (req, res, next) => {
  const slug = String(req.params.slug || '').replace(/[^a-z0-9-]/gi, '');
  if (slug === 'ui-ui-design' || slug === 'ui-ui-desigin') {
    return res.redirect(301, '/blog/ui-ux-design');
  }
  const blogDirFile = path.join(distPath, 'blog', slug, 'index.html');
  const blogFlatFile = path.join(distPath, 'blog', `${slug}.html`);
  if (slug && fs.existsSync(blogDirFile)) {
    return res.sendFile(blogDirFile);
  }
  if (slug && fs.existsSync(blogFlatFile)) {
    return res.sendFile(blogFlatFile);
  }
  return next();
});

app.use(express.static(distPath));

app.use((_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

ensureLeadTable()
  .catch((error) => {
    console.error('Failed to initialize database table:', error.message);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });