import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand.jsx';
import ContactSection from '../components/ContactSection.jsx';
import PackageGrid from '../components/PackageGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionHead from '../components/SectionHead.jsx';
import ServiceIcon from '../components/ServiceIcon.jsx';
import Ticker from '../components/Ticker.jsx';
import TrustStrip from '../components/TrustStrip.jsx';
import TypeLine from '../components/TypeLine.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { useLanguage } from '../LanguageContext.jsx';
import { cases, capabilities, process, products, reviews, solutionApps, solutions } from '../data/site.js';
import { regionKeys } from '../i18n.js';

export default function Home() {
  const { t, copy, localizeHref, appLabel } = useLanguage();
  usePageTitle(t('page.title'));

  return (
    <>
      <section className="hero hero-home">
        <div className="container-wide hero-grid">
          <div className="hero-copy-wrap">
            <span className="pill">{t('hero.pill')}</span>
            <h1 className="display">
              {t('hero.title')} <em><TypeLine /></em>
            </h1>
            <p className="hero-copy">
              {t('hero.copy')}
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/#home-contact">{t('hero.start')}</Link>
              <Link className="btn btn-invert" to="/#home-products">{t('hero.products')}</Link>
            </div>
            <a className="scroll-cue" href="#home-products">
              <span className="sc-line" />
              <i className="fa-solid fa-arrow-down" aria-hidden="true" />
              <span>{t('hero.explore')}</span>
            </a>
          </div>
          <aside className="hero-atelier" aria-label="Products we ship">
            <div className="hero-atelier-stage">
              <div className="hero-shot hero-shot-back">
                <img src="/images/work-tenderlyst-web.png" alt="" />
              </div>
              <div className="hero-shot hero-shot-front">
                <div className="hero-shot-bar">
                  <span className="hero-dots" aria-hidden="true"><i /><i /><i /></span>
                  <span>seo.devndespro</span>
                </div>
                <div className="hero-shot-screen">
                  <img src="/images/seo_dashboard.png" alt="SEO.devndespro live dashboard" />
                </div>
                <span className="hero-glass" aria-hidden="true" />
                <span className="hero-sheen" aria-hidden="true" />
              </div>
            </div>
            <div className="hero-atelier-caption">
              <b>SEO.devndespro</b>
              <span className="hero-live">{t('hero.live')}</span>
              <span className="hero-atelier-dot" aria-hidden="true" />
              <span>{t('hero.tender')}</span>
            </div>
          </aside>
        </div>
        <div className="proof-band">
          <div className="stats-bar">
            <div className="container-wide stats-bar-inner">
              <div className="stat">
                <i className="fa-solid fa-laptop-code" aria-hidden="true" />
                <div>
                  <b>{t('hero.stat1')}</b>
                  <span>{t('hero.stat1s')}</span>
                </div>
              </div>
              <div className="stat">
                <i className="fa-solid fa-rocket" aria-hidden="true" />
                <div>
                  <b className="hi">{t('hero.stat2')}</b>
                  <span>{t('hero.stat2s')}</span>
                </div>
              </div>
              <div className="stat">
                <i className="fa-solid fa-star" aria-hidden="true" />
                <div>
                  <b className="hi">4.8</b>
                  <span>{t('hero.stat3s')}</span>
                </div>
              </div>
            </div>
          </div>
          <TrustStrip />
        </div>
        <Ticker />
      </section>

      <section className="section" id="home-products">
        <div className="container">
          <SectionHead
            eyebrow={t('products.eyebrow')}
            title={<>{t('products.title')} <em>{t('products.titleEm')}</em></>}
            text={t('products.text')}
          />
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                product={{ ...product, ...(copy.products[product.id] || {}) }}
                key={product.id}
                href={product.href}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="home-solutions" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow={t('solutions.eyebrow')}
            title={<>{t('solutions.title')} <em>{t('solutions.titleEm')}</em></>}
            text={t('solutions.text')}
          />
          <div className="solution-grid">
            {solutions.map((item) => {
              const local = copy.solutions[item.index] || item;
              return (
              <article className="card solution-card" key={item.index}>
                <ServiceIcon name={item.icon} />
                <h3>{local.name}</h3>
                <p>{local.text}</p>
                <div className="chip-row">
                  {local.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
                </div>
              </article>
              );
            })}
          </div>
          <div className="app-catalog-wrap" id="home-apps">
            <SectionHead
              eyebrow={t('apps.eyebrow')}
              title={<>{t('apps.title')} <em>{t('apps.titleEm')}</em></>}
              text={t('apps.text')}
            />
            <div className="app-catalog">
              {solutionApps.map((group) => (
                <div className="card" key={group.region}>
                  <p className="pkg-level">
                    <i className={`fa-solid ${group.icon}`} aria-hidden="true" />
                    {t(regionKeys[group.region])}
                  </p>
                  <ul className="app-list">
                    {group.items.map((app) => (
                      <li key={app.href + app.label}>
                        <a href={localizeHref(app.href)}>{appLabel(app)}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="home-cases" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow={t('cases.eyebrow')}
            title={<>{t('cases.title')} <em>{t('cases.titleEm')}</em></>}
            text={t('cases.text')}
          />
          <div className="case-list">
            {cases.map((item) => {
              const local = copy.cases[item.index] || {};
              return (
              <article className="case-row" key={item.title}>
                <div className="case-num">{item.index}</div>
                <div>
                  <div className="case-cats">{(local.category || item.category).map((cat) => <span key={cat}>{cat}</span>)}</div>
                  <h3>{item.title}</h3>
                  <p>{local.desc || item.desc}</p>
                  <a className="case-cta" href={item.href} target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-link" aria-hidden="true" />
                    {t('cases.visit')}
                  </a>
                </div>
                <div className="case-thumb">
                  <img src={item.image} alt={item.title} />
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="home-platform" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow={t('platform.eyebrow')}
            title={<>{t('platform.title')} <em>{t('platform.titleEm')}</em></>}
            text={t('platform.text')}
          />
          <div className="cap-grid">
            {capabilities.map((item, index) => {
              const local = copy.capabilities[item.title] || item;
              return (
              <article className="card cap-card" key={item.title}>
                <div className="cap-card-top">
                  <ServiceIcon name={item.icon} />
                  <div className="num">0{index + 1}</div>
                </div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.35rem', margin: '8px 0 6px' }}>{local.title}</h3>
                <p>{local.sub}</p>
              </article>
              );
            })}
          </div>
          <div className="process-grid" style={{ marginTop: 28 }}>
            {process.map((step) => {
              const local = copy.process[step.index] || step;
              return (
              <article className="card process-card" key={step.index}>
                <div className="num">{step.index}</div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.25rem', margin: '10px 0' }}>{local.name}</h3>
                <p>{local.text}</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="home-packages" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow={t('packages.eyebrow')}
            title={<>{t('packages.title')} <em>{t('packages.titleEm')}</em></>}
            text={t('packages.text')}
          />
          <PackageGrid />
        </div>
      </section>

      <section className="section" id="home-reviews" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow={t('reviews.eyebrow')}
            title={<>{t('reviews.title')} <em>{t('reviews.titleEm')}</em></>}
            text={t('reviews.text')}
          />
          <div className="review-grid">
            {reviews.slice(0, 4).map((review, index) => (
              <article className="card review" key={review.name}>
                <i className="fa-solid fa-quote-left review-quote" aria-hidden="true" />
                <div className="stars">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</div>
                <p>“{review.quote}”</p>
                <div className="review-person">
                  <span className={`review-avatar tone-${index % 3}`} aria-hidden="true">
                    <svg viewBox="0 0 40 40" fill="currentColor">
                      <circle cx="20" cy="14.5" r="7.2" />
                      <path d="M7 37.5c.8-8.8 6.2-13.2 13-13.2s12.2 4.4 13 13.2" />
                    </svg>
                  </span>
                  <div>
                    <div className="review-name">{review.name}</div>
                    {review.company ? <div className="review-meta">{review.company}</div> : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <CtaBand />
    </>
  );
}
