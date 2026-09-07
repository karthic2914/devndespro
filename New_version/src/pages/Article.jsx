import { Link, useParams } from 'react-router-dom';
import usePageTitle from '../components/usePageTitle.js';
import { useLanguage } from '../LanguageContext.jsx';
import { articles } from '../data/site.js';
import NotFound from './NotFound.jsx';

export default function Article() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  usePageTitle(article ? `${article.title} · devndespro` : t('page.404'));

  if (!article) return <NotFound />;

  return (
    <article className="article">
      <Link className="card-link" to="/blog">{t('blog.all')}</Link>
      <div className="eyebrow" style={{ marginTop: 18 }}><i />{article.category} · {article.read}</div>
      <h1>{article.title}</h1>
      <p style={{ fontSize: '1.15rem', color: 'var(--muted)' }}>{article.desc}</p>
      <div style={{ marginTop: 28 }}>
        {article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div style={{ marginTop: 36 }}>
        <Link className="btn btn-primary" to="/#home-contact">{t('blog.talk')}</Link>
      </div>
    </article>
  );
}
