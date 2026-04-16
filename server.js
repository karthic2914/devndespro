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

 // Send notification to devndespro
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

  // Send auto-reply to user (no textcontent — not supported here)
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
    website = ''          // honeypot
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

// ═════════════════════════════════════════════════════════════════════════════

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
    // Get client IP (from CF, nginx, or direct)
    const ip = req.headers['cf-connecting-ip'] ||
               req.headers['x-forwarded-for']?.split(',')[0] ||
               req.socket.remoteAddress || 'unknown';

    const ipHash = crypto.createHash('sha256').update(ip + String(process.env.SECRET || 'default')).digest('hex');

    // Try to insert (will fail silently if already liked by this IP)
    try {
      await dbPool.query(
        `INSERT INTO blog_likes(slug, ip_hash) VALUES ($1, $2)`,
        [slugClean, ipHash]
      );
    } catch (e) {
      // Likely unique constraint violation (already liked); return current count
    }

    // Return current like count
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

// ─────────────────────────────────────────────────────────────────────────────

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