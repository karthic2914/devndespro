import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import usePageTitle from '../components/usePageTitle.js';

const interests = [
  'SEO.devndespro demo',
  'Tenderlyst early access',
  'Website package',
  'Product engineering',
  'Partnership / investment'
];

export default function Contact() {
  usePageTitle('Contact · devndespro');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get('website')) return;

    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://devndespro-production.up.railway.app/api/contact', {
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        throw new Error('Could not send right now. Please email hello@devndespro.com.');
      }

      form.reset();
      setStatus({
        type: 'ok',
        message: 'Message sent. We will reply within 24 hours.'
      });
    } catch (error) {
      setStatus({
        type: 'err',
        message: error.message || 'Could not send right now. Please try again.'
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let’s talk products, partnerships, and <em>growth</em>.</>}
        text="Whether you want a demo, a website package, or a longer build, start with a direct note to the founder."
      />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container contact-grid">
          <div>
            <div className="card">
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', marginBottom: 12 }}>Direct lines</h2>
              <p>Open to product pilots, partnerships, and investor conversations.</p>
              <div className="contact-meta">
                <div className="meta-row">
                  <span>Email</span>
                  <a href="mailto:hello@devndespro.com">hello@devndespro.com</a>
                </div>
                <div className="meta-row">
                  <span>WhatsApp</span>
                  <a href="https://api.whatsapp.com/send?phone=4740975201" target="_blank" rel="noopener noreferrer">
                    Message the founder
                  </a>
                </div>
                <div className="meta-row">
                  <span>Location</span>
                  <strong>Stavanger, Norway</strong>
                </div>
                <div className="meta-row">
                  <span>Response</span>
                  <strong>Within 24 hours</strong>
                </div>
              </div>
            </div>
          </div>

          <form className="card form" onSubmit={onSubmit}>
            <p className="form-note">Share the scope, timeline, and what you want to achieve.</p>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
            <div className="form-row">
              <div>
                <label htmlFor="name">Your name *</label>
                <input id="name" name="name" required placeholder="Ola Nordmann" />
              </div>
              <div>
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" required placeholder="ola@bedrift.no" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label htmlFor="company">Company</label>
                <input id="company" name="company" placeholder="Your company" />
              </div>
              <div>
                <label htmlFor="service">Interest *</label>
                <select id="service" name="service" required defaultValue="">
                  <option value="" disabled>Select a topic</option>
                  {interests.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message">About your project *</label>
              <textarea id="message" name="message" required placeholder="What are you trying to achieve, and when?" />
            </div>
            <p className={`form-status ${status.type}`}>{status.message}</p>
            <button className="btn btn-primary" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
