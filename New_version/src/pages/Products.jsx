import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import ProductCard from '../components/ProductCard.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { products } from '../data/site.js';

export default function Products() {
  usePageTitle('Products · devndespro');

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={<>SaaS products we <em>ship</em>.</>}
        text="We build web applications and SaaS products for growth teams. These are two live examples from our own product line."
      />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container">
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                href={product.href}
                showFeatures
              />
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Need a web app or a SaaS product?"
        text="Talk to us about a custom platform, a new product, or a walkthrough of what we already ship."
        secondary={{ href: 'https://www.tenderlyst.com/', label: 'Visit Tenderlyst' }}
      />
    </>
  );
}
