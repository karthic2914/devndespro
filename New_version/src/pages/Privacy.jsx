import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { useLanguage } from '../LanguageContext.jsx';
import { privacy, privacyMeta } from '../data/privacy.js';

const CANONICAL = 'https://www.devndespro.com/privacy-policy';

export default function Privacy() {
  const { lang, t } = useLanguage();
  const doc = privacy[lang] || privacy.en;
  usePageTitle(t('page.privacy'));

  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    const previous = description?.getAttribute('content') || '';
    description?.setAttribute('content', t('page.privacyDesc'));

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
        <dl className="legal-summary">
          {doc.summary.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          <div>
            <dt>{doc.contactLabel}</dt>
            <dd>
              <a href={`mailto:${privacyMeta.email}`}>{privacyMeta.email}</a>
            </dd>
          </div>
        </dl>

        {doc.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.subsections?.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
            {section.list ? (
              <ul>
                {section.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
            {section.after ? <p>{section.after}</p> : null}
            {section.id === 'rights' ? (
              <p>
                <Link to="/gdpr">{t('footer.gdpr')}</Link>
              </p>
            ) : null}
            {section.links ? (
              <p className="legal-links">
                {section.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
              </p>
            ) : null}
          </section>
        ))}
      </article>
    </>
  );
}
