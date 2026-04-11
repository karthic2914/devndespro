import pg from 'pg';
const { Pool } = pg;

const SLUG_RE  = /^[a-z0-9-]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  const slug = String(req.query.slug || '').trim();
  if (!SLUG_RE.test(slug)) return res.status(400).json({ ok: false, error: 'Invalid slug' });

  if (!process.env.DATABASE_URL) {
    if (req.method === 'GET') return res.json({ ok: true, comments: [] });
    return res.json({ ok: true, pending: true });
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 1,
  });

  try {
    if (req.method === 'GET') {
      const result = await pool.query(
        `SELECT id, name, body, created_at FROM blog_comments
         WHERE slug = $1 AND approved = TRUE
         ORDER BY created_at ASC`,
        [slug]
      );
      return res.json({ ok: true, comments: result.rows });
    }

    if (req.method === 'POST') {
      const {
        name    = '',
        email   = '',
        body    = '',
        website = '',   // honeypot
      } = req.body || {};

      if (website) return res.json({ ok: true }); // bot trap

      const nameClean  = String(name).trim().slice(0, 120);
      const emailClean = String(email).trim().slice(0, 200);
      const bodyClean  = String(body).trim().slice(0, 2000);

      if (nameClean.length < 2)       return res.status(400).json({ ok: false, error: 'Name too short' });
      if (!EMAIL_RE.test(emailClean)) return res.status(400).json({ ok: false, error: 'Invalid email' });
      if (bodyClean.length < 10)      return res.status(400).json({ ok: false, error: 'Comment too short' });

      await pool.query(
        'INSERT INTO blog_comments(slug, name, email, body) VALUES ($1, $2, $3, $4)',
        [slug, nameClean, emailClean, bodyClean]
      );
      return res.json({ ok: true, pending: true });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Database error' });
  } finally {
    await pool.end();
  }
}
