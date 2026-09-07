import { useLanguage } from '../LanguageContext.jsx';

export default function LangSwitch({ className = '' }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t('lang.label')}>
      <button
        type="button"
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={`lang-btn ${lang === 'no' ? 'active' : ''}`}
        aria-pressed={lang === 'no'}
        onClick={() => setLang('no')}
      >
        NO
      </button>
    </div>
  );
}
