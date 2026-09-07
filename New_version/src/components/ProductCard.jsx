import { Link } from 'react-router-dom';

function hostLabel(href) {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export default function ProductCard({ product, to, href, showFeatures = true }) {
  const host = hostLabel(href || '');
  const body = (
    <>
      <div className="product-show-shot">
        <div className="product-show-bar">
          <span className="hero-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>{host || product.name}</span>
        </div>
        <div className="product-show-screen">
          <img src={product.image} alt="" />
          <span className="product-show-sheen" aria-hidden="true" />
        </div>
      </div>
      <div className="product-show-copy">
        <div className="product-show-kicker">
          <b className={product.id === 'seo' ? 'is-live' : undefined}>{product.status}</b>
          <span>{product.type}</span>
        </div>
        <h3>{product.name}</h3>
        {product.tags?.length ? (
          <div className="product-show-tags">
            {product.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
          </div>
        ) : null}
        {host ? (
          <p className="product-show-host">
            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            {host}
          </p>
        ) : null}
        <p>{product.summary}</p>
        {showFeatures && product.features?.length ? (
          <ul className="product-show-feats">
            {product.features.map((feature) => (
              <li key={feature}>
                <i className="fa-solid fa-check" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        ) : null}
        <span className="btn btn-primary product-show-cta">
          {product.cta} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <a className="product-show" href={href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }

  return (
    <Link className="product-show" to={to || '/products'}>
      {body}
    </Link>
  );
}
