import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { useLanguage } from '../LanguageContext.jsx';
import { articles } from '../data/site.js';

export default function Blog() {
  const { t } = useLanguage();
  usePageTitle(t('page.blog'));

  return (
    <>
      <PageHero
        eyebrow={t('blog.eyebrow')}
        title={<>{t('blog.title')} <em>{t('blog.titleEm')}</em>.</>}
        text={t('blog.text')}
        ticker={false}
      />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container">
          <div className="blog-grid">
            {articles.map((article) => (
              <article className="card" key={article.slug}>
                <div className="card-kicker">
                  <b>{article.category}</b>
                  <span>{article.read}</span>
                </div>
                <h3 style={{ fontSize: '1.7rem' }}>{article.title}</h3>
                <p>{article.desc}</p>
                <Link className="card-link" to={`/blog/${article.slug}`}>{t('blog.read')}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title={t('blog.ctaTitle')}
        text={t('blog.ctaText')}
      />
    </>
  );
}
