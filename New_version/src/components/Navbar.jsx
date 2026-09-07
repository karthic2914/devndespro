import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext.jsx';
import { navItems, solutionApps, solutionMenu } from '../data/site.js';
import { megaKeys, navKeys, regionKeys } from '../i18n.js';
import LangSwitch from './LangSwitch.jsx';
import ThemeSwitch from './ThemeSwitch.jsx';
import Logo from './Logo.jsx';

function navClass(path, location) {
  if (path.includes('#')) {
    const hash = path.slice(path.indexOf('#'));
    return location.pathname === '/' && location.hash === hash ? 'active' : undefined;
  }
  return location.pathname === path ? 'active' : undefined;
}

export default function Navbar() {
  const location = useLocation();
  const { t, localizeHref, appLabel } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimer = useRef(null);

  const openMega = () => {
    clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMegaOpen(false), 260);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const closeAll = () => {
    clearTimeout(megaTimer.current);
    setOpen(false);
    setMegaOpen(false);
  };

  useEffect(() => () => clearTimeout(megaTimer.current), []);

  return (
    <header className={`nav ${scrolled || open ? 'is-scrolled' : ''} ${open ? 'open' : ''}`}>
      <div className="nav-inner">
        <Logo onClick={closeAll} />

        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          ) : (
            <i className="fa-solid fa-bars" aria-hidden="true" />
          )}
        </button>

        <ul className="nav-links">
          {navItems.map((item) => (
            item.id === 'solutions' ? (
              <li
                key={item.path}
                className={`nav-mega-item ${megaOpen ? 'is-open' : ''}`}
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <Link
                  to={item.path}
                  className={navClass(item.path, location)}
                  onClick={(event) => {
                    if (window.innerWidth <= 980) {
                      event.preventDefault();
                      setMegaOpen((value) => !value);
                      return;
                    }
                    closeAll();
                  }}
                >
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                  {t(navKeys[item.label])}
                </Link>
                <div className="mega" onMouseEnter={openMega} onMouseLeave={closeMega}>
                  <div className="mega-top">
                    <div className="mega-list">
                      <p className="mega-kicker">{t('nav.mega.what')}</p>
                      {solutionMenu.map((card, index) => (
                        <Link className="mega-row" to={card.to} key={card.title} onClick={closeAll}>
                          <i className={`fa-solid ${card.icon} mega-row-icon`} aria-hidden="true" />
                          <div>
                            <strong>{t(`nav.mega.${megaKeys[index].key}.title`)}</strong>
                            <span>{t(`nav.mega.${megaKeys[index].key}.text`)}</span>
                          </div>
                          <i className="fa-solid fa-arrow-right mega-go" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                    <aside className="mega-feature">
                      <p className="mega-kicker">{t('nav.mega.featured')}</p>
                      <a className="mega-shot" href="https://seo.devndespro.com" target="_blank" rel="noopener noreferrer" onClick={closeAll}>
                        <img src="/images/seo_dashboard.png" alt="" />
                        <div>
                          <small><i className="fa-solid fa-bolt" aria-hidden="true" /> {t('nav.mega.live')}</small>
                          <strong>SEO.devndespro</strong>
                          <span>{t('nav.mega.seoBlurb')}</span>
                        </div>
                      </a>
                      <a className="mega-quiet" href="https://www.tenderlyst.com/" target="_blank" rel="noopener noreferrer" onClick={closeAll}>
                        <span><i className="fa-solid fa-file-signature" aria-hidden="true" /> Tenderlyst</span>
                        <span>{t('nav.mega.early')} <i className="fa-solid fa-arrow-right" aria-hidden="true" /></span>
                      </a>
                    </aside>
                  </div>
                  <div className="mega-apps">
                    {solutionApps.map((group) => (
                      <div className="mega-app-col" key={group.region}>
                        <p className="mega-kicker">
                          <i className={`fa-solid ${group.icon}`} aria-hidden="true" />
                          {t(regionKeys[group.region])}
                        </p>
                        {group.items.map((app) => (
                          <a href={localizeHref(app.href)} key={app.href + app.label} onClick={closeAll}>
                            {appLabel(app)}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mega-foot">
                    <Link className="mega-all" to="/#home-apps" onClick={closeAll}>
                      {t('nav.mega.all')} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.path}>
                <Link to={item.path} className={navClass(item.path, location)} onClick={closeAll}>
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                  {t(navKeys[item.label])}
                </Link>
              </li>
            )
          ))}
          <li className="nav-mobile-cta">
            <Link to="/#home-contact" className="btn btn-primary" onClick={closeAll}>
              <i className="fa-solid fa-calendar-check" aria-hidden="true" />
              {t('nav.demo')}
            </Link>
          </li>
        </ul>

        <div className="nav-tools">
          <ThemeSwitch />
          <LangSwitch className="nav-lang" />
        </div>
        <Link to="/#home-contact" className="btn btn-primary nav-cta">
          <i className="fa-solid fa-calendar-check" aria-hidden="true" />
          {t('nav.demo')}
        </Link>
      </div>
    </header>
  );
}
