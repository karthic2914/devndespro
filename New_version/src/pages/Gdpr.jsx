import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import CookieConsent from '../components/CookieConsent.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { useLanguage } from '../LanguageContext.jsx';
import { gdpr } from '../data/gdpr.js';

const CANONICAL = 'https://www.devndespro.com/gdpr';

export default function Gdpr() {
  const { lang, t } = useLanguage();
  const doc = gdpr[lang] || gdpr.en;
  usePageTitle(t('page.gdpr'));

  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    const previous = description?.getAttribute('content') || '';
    description?.setAttribute('content', t('page.gdprDesc'));

    let canonical = document.querySelector('link[rel="canonical"]');
    const created = !canonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    const previousCanonical = canonical.getAttribute('href') || '';
    canonical.setAttribute('href', CANONICAL);

    return () => {
      description?.setAttribute('content', previous);
      if (created) canonical.remove();
      else canonical.setAttribute('href', previousCanonical);
    };
  }, [t]);

  return (
    <>
      <PageHero
        eyebrow={doc.eyebrow}
        title={doc.title}
        text={doc.intro}
        ticker={false}
      />
      <article className="article legal">
        {doc.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.list ? (
              <ul>
                {section.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
            {section.after ? <p>{section.after}</p> : null}
            {section.id === 'cookies' ? <CookieConsent embedded /> : null}
            {section.id === 'policy' ? (
              <p>
                <Link to="/privacy-policy">{t('footer.privacy')}</Link>
                {' · '}
                <Link to="/privacy-policy#deletion">{t('gdpr.deletion')}</Link>
              </p>
            ) : null}
          </section>
        ))}
      </article>
    </>
  );
}
