import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { copy, ui } from './i18n.js';

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
  localizeHref: (href) => href,
  appLabel: (app) => app?.label
});

function readLang() {
  if (typeof window === 'undefined') return 'en';
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang === 'no' || urlLang === 'en') return urlLang;
  try {
    const stored = localStorage.getItem('siteLang');
    if (stored === 'no' || stored === 'en') return stored;
  } catch {
    /* ignore */
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next) => {
    const active = next === 'no' ? 'no' : 'en';
    setLangState(active);
    try { localStorage.setItem('siteLang', active); } catch { /* ignore */ }
    const url = new URL(window.location.href);
    if (active === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', 'no');
    window.history.replaceState({}, '', url.toString());
  };

  const value = useMemo(() => {
    const dict = ui[lang] || ui.en;
    return {
      lang,
      setLang,
      t: (key) => dict[key] ?? ui.en[key] ?? key,
      copy: copy[lang] || copy.en,
      localizeHref: (href) => {
        if (lang !== 'no' || !href) return href;
        if (href.startsWith('/seo/')) return `/no${href}`;
        return href;
      },
      appLabel: (app) => (lang === 'no' && app.labelNo ? app.labelNo : app.label)
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
