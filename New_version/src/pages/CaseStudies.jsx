import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { cases } from '../data/site.js';

export default function CaseStudies() {
  usePageTitle('Case Studies · devndespro');

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={<>Selected work, <em>real outcomes</em>.</>}
        text="Education, SaaS, and proposal platforms, designed and built for conversion, speed, and daily use."
      />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container">
          <div className="case-list">
            {cases.map((item) => (
              <article className="case-row" key={item.title}>
                <div className="case-num">{item.index}</div>
                <div>
                  <div className="case-cats">{item.category.map((cat) => <span key={cat}>{cat}</span>)}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="chip-row">
                    {item.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
                  </div>
                  <div className="metric-row">
                    {item.metrics.map((metric) => (
                      <div key={metric.label}>
                        <b>{metric.value}</b>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>
                  <a className="case-cta" href={item.href} target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-link" aria-hidden="true" />
                    Visit site
                  </a>
                </div>
                <div className="case-thumb">
                  <img src={item.image} alt={item.title} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Want a similar result?"
        text="Tell us about the product, site, or workflow you need to ship."
        primary={{ to: '/contact', label: 'Start a similar project' }}
      />
    </>
  );
}
