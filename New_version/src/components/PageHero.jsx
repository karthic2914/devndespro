import Ticker from './Ticker.jsx';

export default function PageHero({ eyebrow, title, text, ticker = true }) {
  return (
    <>
      <section className="hero hero-page">
        <div className="container-wide hero-grid">
          <div className="hero-copy-wrap">
            <span className="pill">{eyebrow}</span>
            <h1 className="display">{title}</h1>
            {text ? <p className="hero-copy">{text}</p> : null}
          </div>
        </div>
      </section>
      {ticker ? <Ticker /> : null}
    </>
  );
}
