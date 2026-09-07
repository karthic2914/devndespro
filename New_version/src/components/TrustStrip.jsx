import { useLanguage } from '../LanguageContext.jsx';

export default function TrustStrip() {
  const { t } = useLanguage();

  return (
    <div className="trust-strip">
      <div className="container-wide trust-strip-inner">
        <p>
          {t('trust.prefix')}
          <strong>Norway</strong>
          <strong>Europe</strong>
          <strong>India</strong>
          <strong>APAC</strong>
        </p>
        <a
          className="trust-badge"
          href="https://www.designrush.com/agency/profile/devndespro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-shield-halved" aria-hidden="true" />
          {t('trust.badge')}
        </a>
      </div>
    </div>
  );
}
