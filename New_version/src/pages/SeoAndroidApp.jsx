import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { useLanguage } from '../LanguageContext.jsx';
import { PLAY_SEO } from '../data/site.js';

const CANONICAL = 'https://www.devndespro.com/seo-android-app';
const SCHEMA_ID = 'seo-android-schema';

const features = [
  { icon: 'fa-magnifying-glass', key: 'audit' },
  { icon: 'fa-chart-column', key: 'track' },
  { icon: 'fa-sliders', key: 'optimize' },
  { icon: 'fa-arrow-trend-up', key: 'grow' }
];

const faqs = [
  { q: 'page.app.q1', a: 'page.app.a1' },
  { q: 'page.app.q2', a: 'page.app.a2' },
  { q: 'page.app.q3', a: 'page.app.a3' }
];

function schemaJson(t) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'SEO.devndespro',
        alternateName: ['SEO.devndespro Android app', 'devndespro SEO app'],
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'SEO',
        operatingSystem: 'Android, Web',
        description: t('page.app.desc'),
        url: CANONICAL,
        downloadUrl: PLAY_SEO,
        installUrl: PLAY_SEO,
        image: 'https://www.devndespro.com/images/seo-android-launch.jpg',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author: {
          '@type': 'Organization',
          name: 'devndespro',
          url: 'https://www.devndespro.com'
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: t(item.q),
          acceptedAnswer: { '@type': 'Answer', text: t(item.a) }
        }))
      }
    ]
  });
}

export default function SeoAndroidApp() {
  const { t } = useLanguage();
  usePageTitle(t('page.app'));

  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    const previous = description?.getAttribute('content') || '';
    description?.setAttribute('content', t('page.app.desc'));

    let canonical = document.querySelector('link[rel="canonical"]');
    const created = !canonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    const previousCanonical = canonical.getAttribute('href') || '';
    canonical.setAttribute('href', CANONICAL);

    let script = document.getElementById(SCHEMA_ID);
    if (!script) {
      script = document.createElement('script');
      script.id = SCHEMA_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = schemaJson(t);

    return () => {
      description?.setAttribute('content', previous);
      if (created) canonical.remove();
      else canonical.setAttribute('href', previousCanonical);
      document.getElementById(SCHEMA_ID)?.remove();
    };
  }, [t]);

  return (
    <>
      <PageHero
        eyebrow={t('app.eyebrow')}
        title={<>{t('app.title')} <em>{t('app.titleEm')}</em></>}
        text={t('app.text')}
        ticker={false}
      />

      <section className="section app-page" id="app-download">
        <div className="container">
          <div className="app-launch-card">
            <div className="app-launch-copy">
              <p>{t('page.app.body')}</p>
              <ul className="app-launch-feats">
                {features.map((item) => (
                  <li key={item.key}>
                    <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                    <span>{t(`app.${item.key}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="app-launch-actions">
                <a className="btn btn-primary" href={PLAY_SEO} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-google-play" aria-hidden="true" />
                  {t('app.play')}
                </a>
                <a className="btn btn-invert" href="https://seo.devndespro.com" target="_blank" rel="noopener noreferrer">
                  {t('app.web')}
                </a>
              </div>
            </div>
            <figure className="app-launch-poster">
              <img
                src="/images/seo-android-launch.jpg"
                alt="SEO.devndespro Android app is live on Google Play"
              />
            </figure>
          </div>
        </div>
      </section>

      <article className="article legal">
        <section>
          <h2>{t('page.app.faqTitle')}</h2>
          {faqs.map((item) => (
            <div key={item.q}>
              <h3>{t(item.q)}</h3>
              <p>{t(item.a)}</p>
            </div>
          ))}
          <p>
            <Link to="/privacy-policy">{t('footer.privacy')}</Link>
          </p>
        </section>
      </article>

      <CtaBand
        title={t('page.app.ctaTitle')}
        text={t('page.app.ctaText')}
        secondary={{ href: PLAY_SEO, label: t('app.play') }}
      />
    </>
  );
}
