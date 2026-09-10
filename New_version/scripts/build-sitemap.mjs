import fs from 'fs';
import path from 'path';

const root = path.resolve('public');
const host = 'https://www.devndespro.com';
const today = '2026-09-10';
const skipSeo = new Set(['web-developer-norway']);

function slugs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((file) => file.endsWith('.html'))
    .map((file) => file.replace(/\.html$/, ''))
    .sort();
}

const en = slugs(path.join(root, 'seo')).filter((slug) => !skipSeo.has(slug));
const no = new Set(slugs(path.join(root, 'no/seo')));
const services = slugs(path.join(root, 'services'));
const cities = fs.readdirSync(root)
  .filter((file) => /^web-developer-.+\.html$/.test(file))
  .map((file) => file.replace(/\.html$/, ''))
  .sort();
const blogs = [
  'ui-ux-product-clarity',
  'core-web-vitals-founders',
  'service-page-seo-structure',
  'web-designer-norway',
  'web-developer-norway'
];

function url(loc, priority, freq = 'monthly') {
  return `  <url>
    <loc>${host}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function seoPriority(slug) {
  if (/(norway|norge|stavanger|oslo|bergen|trondheim|kristiansand|usa|india|chennai|bangalore|hyderabad|mumbai)/.test(slug)) return '0.8';
  return '0.7';
}

const parts = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '',
  '  <!-- Main -->',
  url('/', '1.0', 'weekly'),
  url('/seo-android-app', '0.8', 'weekly'),
  url('/privacy-policy', '0.5', 'yearly'),
  url('/gdpr', '0.5', 'yearly'),
  '',
  '  <!-- Blog -->',
  url('/blog', '0.8', 'weekly'),
  ...blogs.map((slug) => url(`/blog/${slug}`, '0.7')),
  '',
  '  <!-- Country hubs -->',
  ...services.map((slug) => url(`/services/${slug}`, '0.9')),
  '',
  '  <!-- City web developer pages -->',
  ...cities.map((slug) => url(`/${slug}`, '0.8')),
  '',
  '  <!-- SEO landings EN -->',
  ...en.map((slug) => url(`/seo/${slug}`, seoPriority(slug))),
  '',
  '  <!-- SEO landings NO -->',
  ...en.filter((slug) => no.has(slug)).map((slug) => url(`/no/seo/${slug}`, '0.6')),
  '',
  '</urlset>',
  ''
];

const out = path.join(root, 'sitemap.xml');
fs.writeFileSync(out, parts.join('\n'), 'utf8');
const count = (parts.join('\n').match(/<loc>/g) || []).length;
console.log(`wrote ${out} (${count} urls, ${services.length} services, ${cities.length} cities, ${en.length} en, ${no.size} no)`);
