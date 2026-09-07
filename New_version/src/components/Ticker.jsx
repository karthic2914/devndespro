import { useLanguage } from '../LanguageContext.jsx';

export default function Ticker() {
  const { copy } = useLanguage();
  const items = copy.ticker;

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => <span key={`${item}-${i}`}>{item}</span>)}
      </div>
    </div>
  );
}
