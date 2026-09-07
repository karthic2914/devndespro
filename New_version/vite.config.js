import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function seoCleanUrls() {
  const rewrite = (url = '') => {
    const clean = url.split('?')[0];
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
