import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { useLanguage } from '../LanguageContext.jsx';

const exploreLinks = [
  { label: 'Web Developer Norway', labelNo: 'Webutvikler Norge', href: '/services/web-developer-norway' },
  { label: 'Web Developer USA', labelNo: 'Webutvikler USA', href: '/services/web-developer-usa' },
  { label: 'Web Developer India', labelNo: 'Webutvikler India', href: '/services/web-developer-india' },
  { label: 'Web Developer Stavanger', labelNo: 'Webutvikler Stavanger', href: '/web-developer-stavanger' },
  { label: 'Web Design Stavanger', labelNo: 'Nettsidedesign Stavanger', href: '/seo/web-design-stavanger' },
  { label: 'Web Design Norway', labelNo: 'Nettsidedesign Norge', href: '/seo/web-design-norway' },
  { label: 'SEO Services Norway', labelNo: 'SEO-tjenester Norge', href: '/seo/seo-services-norway' },
  { label: 'Freelance Web Developer Norway', labelNo: 'Freelance webutvikler Norge', href: '/seo/freelance-web-developer-norway' }
];

export default function NotFound() {
  const { t, localizeHref, lang } = useLanguage();
  usePageTitle(t('page.404'));

  useEffect(() => {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex,follow';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  return (
    <>
      <PageHero
        eyebrow={t('nf.eyebrow')}
        title={<>{t('nf.title')} <em>{t('nf.titleEm')}</em></>}
        text={t('nf.text')}
        ticker={false}
      />
      <section className="section nf-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <article className="card nf-card">
            <div className="nf-code" aria-hidden="true">404</div>
            <div className="nf-actions">
              <Link className="btn btn-primary" to="/">
                <i className="fa-solid fa-house" aria-hidden="true" />
                {t('nf.home')}
              </Link>
              <Link className="btn btn-ghost" to="/#home-contact">
                {t('nf.contact')}
              </Link>
              <Link className="btn btn-ghost" to="/blog">
                {t('nav.blog')}
              </Link>
            </div>
            <p className="nf-kicker">{t('nf.explore')}</p>
            <div className="nf-links">
              {exploreLinks.map((item) => (
                <a key={item.href} href={localizeHref(item.href)}>
                  {lang === 'no' ? item.labelNo : item.label}
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
