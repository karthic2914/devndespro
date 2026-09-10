import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function seoCleanUrls() {
  const rewrite = (url = '') => {
    const clean = url.split('?')[0];
    if (clean === '/web-developer-norway' || clean === '/web-developer-norway/') {
      return '/services/web-developer-norway.html';
    }
    const services = clean.match(/^\/services\/([^/.]+)\/?$/);
    if (services) return `/services/${services[1]}.html`;
    const city = clean.match(/^\/web-developer-([^/.]+)\/?$/);
    if (city) return `/web-developer-${city[1]}.html`;
    const match = clean.match(/^\/(no\/)?seo\/([^/.]+)\/?$/);
    if (!match) return null;
    const prefix = match[1] ? '/no/seo' : '/seo';
    return `${prefix}/${match[2]}.html`;
  };

  return {
    name: 'seo-clean-urls',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const nextUrl = rewrite(req.url);
        if (nextUrl) req.url = nextUrl;
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const nextUrl = rewrite(req.url);
        if (nextUrl) req.url = nextUrl;
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), seoCleanUrls()],
  server: {
    port: 5174,
    open: true
  }
});
