import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext.jsx';

const FLASH_H = '28px';

export default function FlashNews() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--flash-h', visible ? FLASH_H : '0px');
    root.classList.toggle('has-flash', visible);
    return () => {
      root.style.setProperty('--flash-h', '0px');
      root.classList.remove('has-flash');
    };
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="flash-news" role="status">
      <span className="flash-news-shine" aria-hidden="true" />
      <div className="flash-news-inner">
        <span className="flash-news-tag">
          <i className="fa-solid fa-bolt" aria-hidden="true" />
          {t('flash.tag')}
        </span>
        <p>
          <span className="flash-news-full">{t('flash.text')}</span>
          <span className="flash-news-short">{t('flash.textShort')}</span>
        </p>
        <Link className="flash-news-more" to="/seo-android-app">
          <span>{t('flash.more')}</span>
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
        <button className="flash-news-close" type="button" onClick={dismiss} aria-label={t('flash.close')}>
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
