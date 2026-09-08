import { Link } from 'react-router-dom';
import { PLAY_SEO } from '../data/site.js';
import { useLanguage } from '../LanguageContext.jsx';

const features = [
  { icon: 'fa-magnifying-glass', key: 'audit' },
  { icon: 'fa-chart-column', key: 'track' },
  { icon: 'fa-sliders', key: 'optimize' },
  { icon: 'fa-arrow-trend-up', key: 'grow' }
];

export default function AppLaunch() {
  const { t } = useLanguage();

  return (
    <section className="section app-launch" id="home-app">
      <div className="container">
        <div className="app-launch-card">
          <div className="app-launch-copy">
            <span className="pill">{t('app.eyebrow')}</span>
            <h2>
              {t('app.title')} <em>{t('app.titleEm')}</em>
            </h2>
            <p>{t('app.text')}</p>
            <ul className="app-launch-feats">
              {features.map((item) => (
                <li key={item.key}>
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                  <span>{t(`app.${item.key}`)}</span>
                </li>
              ))}
            </ul>
            <div className="app-launch-actions">
              <a className="btn btn-primary" href={PLAY_SEO} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-google-play" aria-hidden="true" />
                {t('app.play')}
              </a>
              <a className="btn btn-invert" href="https://seo.devndespro.com" target="_blank" rel="noopener noreferrer">
                {t('app.web')}
              </a>
              <Link className="btn btn-invert" to="/seo-android-app">
                {t('app.more')}
              </Link>
            </div>
          </div>
          <figure className="app-launch-poster">
            <img
              src="/images/seo-android-launch.jpg"
              alt="SEO.devndespro Android app is live on Google Play"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
