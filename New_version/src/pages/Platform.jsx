import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import SectionHead from '../components/SectionHead.jsx';
import ServiceIcon from '../components/ServiceIcon.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { capabilities, process, skills } from '../data/site.js';

export default function Platform() {
  usePageTitle('Platform · devndespro');

  return (
    <>
      <PageHero
        eyebrow="Platform"
        title={<>The stack behind the <em>work</em>.</>}
        text="Design, engineering, cloud, and growth in one delivery system, used on our products and on client platforms."
      />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container">
          <div className="contact-grid">
            <div className="card">
              <div className="eyebrow"><i />Execution stack</div>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '2.1rem', margin: '12px 0 18px' }}>
                Built to go from concept to production.
              </h2>
              <p className="lede">
                We lead delivery as a technical founder team: UX first, then interfaces, APIs, cloud, and the loops that keep a product improving after launch.
              </p>
              <div style={{ marginTop: 28 }}>
                {skills.map((skill) => (
                  <div className="skill" key={skill.name}>
                    <div className="skill-top">
                      <span>{skill.name}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{ width: `${skill.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cap-grid">
              {capabilities.map((item, index) => (
                <article className="card cap-card" key={item.title}>
                  <div className="cap-card-top">
                    <ServiceIcon name={item.icon} />
                    <div className="num">0{index + 1}</div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.35rem', margin: '8px 0 6px' }}>{item.title}</h3>
                  <p>{item.sub}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Delivery" title={<>How the platform <em>ships</em></>} />
          <div className="process-grid">
            {process.map((step) => (
              <article className="card" key={step.index}>
                <div className="num">{step.index}</div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.25rem', margin: '10px 0' }}>{step.name}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Need a platform, not a brochure?"
        text="Talk to us about product architecture, cloud delivery, or taking an existing system further."
      />
    </>
  );
}
