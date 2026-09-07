import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { packages } from '../data/site.js';

export default function Packages() {
  usePageTitle('Packages · devndespro');

  return (
    <>
      <PageHero
        eyebrow="Packages"
        title={<>Simple packages. <em>Serious delivery</em>.</>}
        text="Website, SEO, hosting guidance, and growth support for small and mid-size businesses. Clear monthly work, no hidden fees."
      />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container">
          <div className="pkg-grid">
            {packages.map((pkg) => (
              <article className={`card pkg-card ${pkg.featured ? 'featured' : ''} ${pkg.dark ? 'dark' : ''}`} key={pkg.name}>
                {pkg.badge ? <div className="pkg-badge">{pkg.badge}</div> : null}
                <div className="pkg-level">{pkg.level}</div>
                <h3>{pkg.name}</h3>
                <p>{pkg.text}</p>
                <ul>
                  {pkg.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link className={`btn ${pkg.featured || pkg.dark ? 'btn-primary' : 'btn-dark'}`} to="/contact">
                  {pkg.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Not sure which package fits?"
        text="Send a short brief. We will recommend a starting point within 24 hours."
      />
    </>
  );
}
