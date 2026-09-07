import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext.jsx';

export default function CtaBand({ title, text, primary, secondary }) {
  const { t } = useLanguage();
  const resolved = {
    title: title ?? t('cta.title'),
    text: text ?? t('cta.text'),
    primary: primary ?? { to: '/#home-contact', label: t('cta.primary') },
    secondary: secondary ?? { to: '/#home-products', label: t('cta.secondary') }
  };

  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <h2>{resolved.title}</h2>
          <p>{resolved.text}</p>
        </div>
        <div className="cta-actions">
          <Link className="btn btn-primary" to={resolved.primary.to}>{resolved.primary.label}</Link>
          {resolved.secondary.href ? (
            <a className="btn btn-invert" href={resolved.secondary.href} target="_blank" rel="noopener noreferrer">
              {resolved.secondary.label}
            </a>
          ) : (
            <Link className="btn btn-invert" to={resolved.secondary.to}>{resolved.secondary.label}</Link>
          )}
        </div>
      </div>
    </section>
  );
}
