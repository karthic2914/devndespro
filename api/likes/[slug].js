import pg from 'pg';
import crypto from 'crypto';
const { Pool } = pg;

const SLUG_RE = /^[a-z0-9-]+$/;

export default async function handler(req, res) {
  const slug = String(req.query.slug || '').trim();
  if (!SLUG_RE.test(slug)) return res.status(400).json({ ok: false, error: 'Invalid slug' });

  if (!process.env.DATABASE_URL) return res.json({ ok: true, count: 0, liked: false });

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 1,
  });

  try {
    if (req.method === 'GET') {
      const result = await pool.query(
        'SELECT COUNT(*) as count FROM blog_likes WHERE slug = $1',
        [slug]
      );
      return res.json({ ok: true, count: parseInt(result.rows[0].count, 10) });
    }

    if (req.method === 'POST') {
      const ip =
        String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
        'unknown';
      const ipHash = crypto
        .createHash('sha256')
        .update(ip + (process.env.SECRET || 'devndespro-salt'))
        .digest('hex');

      try {
        await pool.query(
          'INSERT INTO blog_likes(slug, ip_hash) VALUES ($1, $2)',
          [slug, ipHash]
        );
      } catch (_dupErr) {
        // Unique constraint: same IP already liked
      }

      const result = await pool.query(
        'SELECT COUNT(*) as count FROM blog_likes WHERE slug = $1',
        [slug]
      );
      return res.json({ ok: true, liked: true, count: parseInt(result.rows[0].count, 10) });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Database error' });
  } finally {
    await pool.end();
  }
}
