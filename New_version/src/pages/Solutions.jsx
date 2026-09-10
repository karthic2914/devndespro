import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import SectionHead from '../components/SectionHead.jsx';
import ServiceIcon from '../components/ServiceIcon.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { faqs, process, solutionApps, solutions } from '../data/site.js';

export default function Solutions() {
  usePageTitle('Solutions · devndespro');

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={<>From idea to a <em>working product</em>.</>}
        text="UX, engineering, cloud, and growth for web applications and SaaS products, ours and our clients."
      />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container">
          <div className="solution-grid">
            {solutions.map((item) => (
              <article className="card solution-card" key={item.index}>
                <ServiceIcon name={item.icon} />
                <h3>{item.name}</h3>
                <p>{item.text}</p>
                <div className="chip-row">
                  {item.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Applications"
            title={<>Web apps and services by <em>region</em></>}
            text="The same application pages from the live site, Norway, Europe, USA, India, and engineering."
          />
          <div className="app-catalog">
            {solutionApps.map((group) => (
              <div className="card" key={group.region}>
                <p className="pkg-level">{group.region}</p>
                <ul className="app-list">
                  {group.items.map((app) => (
                    <li key={app.href + app.label}>
                      <a href={app.href} target="_blank" rel="noopener noreferrer">{app.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How we work" title={<>A process that stays <em>clear</em></>} />
          <div className="process-grid">
            {process.map((step) => (
              <article className="card process-card" key={step.index}>
                <div className="num">{step.index}</div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', margin: '10px 0' }}>{step.name}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Questions" title={<>What clients <em>usually ask</em></>} />
          <div className="solution-grid">
            {faqs.map((item) => (
              <article className="card" key={item.q}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: 10 }}>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link className="btn btn-ghost" to="/#home-contact">Ask a different question</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
