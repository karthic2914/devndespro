import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx';
import Article from './pages/Article.jsx';
import NotFound from './pages/NotFound.jsx';
import Privacy from './pages/Privacy.jsx';
import Gdpr from './pages/Gdpr.jsx';
import SeoAndroidApp from './pages/SeoAndroidApp.jsx';

const SEO_APP = 'https://seo.devndespro.com';

function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Navigate to="/#home-products" replace />} />
        <Route path="/solutions" element={<Navigate to="/#home-solutions" replace />} />
        <Route path="/case-studies" element={<Navigate to="/#home-cases" replace />} />
        <Route path="/platform" element={<Navigate to="/#home-platform" replace />} />
        <Route path="/packages" element={<Navigate to="/#home-packages" replace />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Article />} />
        <Route path="/contact" element={<Navigate to="/#home-contact" replace />} />
        <Route path="/seo-android-app" element={<SeoAndroidApp />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/gdpr" element={<Gdpr />} />
        <Route path="/seo-tool/*" element={<ExternalRedirect to={SEO_APP} />} />
        <Route path="/seo-tool" element={<ExternalRedirect to={SEO_APP} />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
