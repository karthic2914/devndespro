import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext.jsx';
import { packageCurrencies, packages } from '../data/site.js';

export default function PackageGrid() {
  const { t, copy } = useLanguage();
  const [currency, setCurrency] = useState('nok');
  const active = packageCurrencies.find((item) => item.id === currency) || packageCurrencies[0];

  return (
    <>
      <div className="pkg-currency" role="group" aria-label={t('packages.currency')}>
        {packageCurrencies.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === currency ? 'is-on' : ''}
            onClick={() => setCurrency(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="pkg-grid">
        {packages.map((pkg) => {
          const price = pkg.prices[currency];
          const local = copy.packages[pkg.id] || {};
          return (
            <article className={`card pkg-card ${pkg.featured ? 'featured' : ''} ${pkg.dark ? 'dark' : ''}`} key={pkg.id}>
              {(local.badge || pkg.badge) ? <div className="pkg-badge">{local.badge || pkg.badge}</div> : null}
              <div className="pkg-level">{local.level || pkg.level}</div>
              <h3>{local.name || pkg.name}</h3>
              {pkg.custom ? (
                <div className="pkg-price pkg-price-custom">{t('packages.custom')}</div>
              ) : (
                <div className="pkg-price">
                  {active.symbol}{price.amount}<sub>/mo</sub>
                </div>
              )}
              <div className="pkg-alt">{price.alt}</div>
              <p>{local.text || pkg.text}</p>
              <ul>
                {(local.items || pkg.items).map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Link className={`btn ${pkg.featured ? 'btn-primary' : 'btn-ghost'}`} to="/#home-contact">
                {local.cta || pkg.cta}
              </Link>
              <p className="pkg-stripe">
                <i className="fa-brands fa-stripe" aria-hidden="true" />
                {pkg.custom ? t('packages.stripeCustom') : t('packages.stripe')}
              </p>
            </article>
          );
        })}
      </div>
    </>
  );
}
