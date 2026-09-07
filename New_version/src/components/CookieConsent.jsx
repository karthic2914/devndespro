import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext.jsx';
import { getConsent, setConsent } from '../analytics.js';

function SettingsPanel({ embedded, choice, analyticsOn, setAnalyticsOn, onSave, onClose, t }) {
  return (
    <div className={embedded ? 'cookie-panel' : 'cookie-bar'} role="dialog" aria-label={t('cookie.title')}>
      <div className="cookie-head">
        <strong>{t('cookie.title')}</strong>
        {!embedded ? (
          <button
            className="cookie-x"
            type="button"
            onClick={() => (choice ? onClose() : onSave(false))}
            aria-label={t('cookie.close')}
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <p>{embedded ? t('cookie.manage') : t('cookie.text')}</p>
      <ul className="cookie-opts">
        <li>
          <div>
            <b>{t('cookie.necessary')}</b>
            <span>{t('cookie.necessaryHint')}</span>
          </div>
          <em>{t('cookie.always')}</em>
        </li>
        <li>
          <div>
            <b>{t('cookie.analytics')}</b>
            <span>Google Analytics</span>
          </div>
          <button
            className={`cookie-switch ${analyticsOn ? 'is-on' : ''}`}
            type="button"
            role="switch"
            aria-checked={analyticsOn}
            onClick={() => setAnalyticsOn((value) => !value)}
          >
            <i />
          </button>
        </li>
      </ul>
      <div className="cookie-actions">
        <button className="btn btn-primary" type="button" onClick={() => onSave(analyticsOn)}>
          {t('cookie.save')}
        </button>
        <Link to="/privacy-policy">{t('footer.privacy')}</Link>
        <Link to="/gdpr">{t('footer.gdpr')}</Link>
      </div>
      {embedded && choice ? (
        <p className="cookie-status">
          {choice === 'accepted' ? t('cookie.on') : t('cookie.off')}
        </p>
      ) : null}
    </div>
  );
}

export default function CookieConsent({ embedded = false }) {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [choice, setChoice] = useState(null);
  const [analyticsOn, setAnalyticsOn] = useState(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = getConsent();
    setChoice(current);
    setAnalyticsOn(current === 'accepted');
    setOpen(!current);
    setReady(true);
  }, []);

  const save = (enabled) => {
    const next = setConsent(enabled ? 'accepted' : 'rejected');
    setChoice(next);
    setAnalyticsOn(next === 'accepted');
    setOpen(false);
  };

  if (!ready) return null;

  if (embedded) {
    return (
      <SettingsPanel
        embedded
        choice={choice}
        analyticsOn={analyticsOn}
        setAnalyticsOn={setAnalyticsOn}
        onSave={save}
        t={t}
      />
    );
  }

  if (pathname === '/gdpr') return null;

  return (
    <>
      {open ? (
        <SettingsPanel
          choice={choice}
          analyticsOn={analyticsOn}
          setAnalyticsOn={setAnalyticsOn}
          onSave={save}
          onClose={() => setOpen(false)}
          t={t}
        />
      ) : (
        <button
          className="cookie-float"
          type="button"
          onClick={() => {
            setAnalyticsOn(choice === 'accepted');
            setOpen(true);
          }}
          aria-label={t('cookie.settings')}
        >
          <i className="fa-solid fa-cookie-bite" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
