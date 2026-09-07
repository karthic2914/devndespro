import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext.jsx';

export default function ContactSection() {
  const { t, copy } = useLanguage();
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
        throw new Error(t('form.err'));
      }

      form.reset();
      setStatus({
        type: 'ok',
        message: t('form.ok')
      });
    } catch (error) {
      setStatus({
        type: 'err',
        message: error.message || t('form.err')
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section" id="home-contact" style={{ paddingTop: 0 }}>
      <div className="container contact-grid">
        <div>
          <div className="card">
            <div className="eyebrow"><i />{t('contact.eyebrow')}</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: '2rem', margin: '12px 0' }}>
              {t('contact.title')}
            </h2>
            <p>{t('contact.lede')}</p>
            <div className="contact-meta">
              <div className="meta-row">
                <span>{t('contact.email')}</span>
                <a href="mailto:hello@devndespro.com">hello@devndespro.com</a>
              </div>
              <div className="meta-row">
                <span>{t('contact.whatsapp')}</span>
                <a href="https://api.whatsapp.com/send?phone=4740975201" target="_blank" rel="noopener noreferrer">
                  {t('contact.message')}
                </a>
              </div>
              <div className="meta-row">
                <span>{t('contact.location')}</span>
                <strong>{t('contact.place')}</strong>
              </div>
              <div className="meta-row">
                <span>{t('contact.response')}</span>
                <strong>{t('contact.within')}</strong>
              </div>
            </div>
          </div>
        </div>

        <form className="card form" onSubmit={onSubmit} key={t('form.send')}>
          <p className="form-note">{t('form.note')}</p>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
          <div className="form-row">
            <div>
              <label htmlFor="name">{t('form.name')}</label>
              <input id="name" name="name" required placeholder="Ola Nordmann" />
            </div>
            <div>
              <label htmlFor="email">{t('form.email')}</label>
              <input id="email" name="email" type="email" required placeholder="ola@bedrift.no" />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="company">{t('form.company')}</label>
              <input id="company" name="company" placeholder={t('form.companyPh')} />
            </div>
            <div>
              <label htmlFor="service">{t('form.interest')}</label>
              <select id="service" name="service" required defaultValue="">
                <option value="" disabled>{t('form.select')}</option>
                {copy.interests.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="message">{t('form.project')}</label>
            <textarea id="message" name="message" required placeholder={t('form.projectPh')} />
          </div>
          <p className={`form-status ${status.type}`}>{status.message}</p>
          <p className="form-privacy">
            {t('form.privacy')}{' '}
            <Link to="/privacy-policy">{t('footer.privacy')}</Link>.
          </p>
          <button className="btn btn-primary" type="submit" disabled={sending}>
            {sending ? t('form.sending') : t('form.send')}
          </button>
        </form>
      </div>
    </section>
  );
}
