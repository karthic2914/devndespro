import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext.jsx';
import { navItems } from '../data/site.js';
import { navKeys } from '../i18n.js';
import Logo from './Logo.jsx';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-top">
          <Logo surface="on-dark" />
          <nav className="footer-nav" aria-label="Footer">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                {t(navKeys[item.label])}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>{t('footer.copy')}</p>
          <p>hello@devndespro.com · +47 409 75 201</p>
        </div>
      </div>
    </footer>
  );
}
