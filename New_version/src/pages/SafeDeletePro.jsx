import { Link } from 'react-router-dom';
import usePageTitle from '../components/usePageTitle.js';

const features = [
  {
    title: 'Elementor reference detection',
    description: 'Check supported Elementor content for references to WordPress pages.'
  },
  {
    title: 'Menu and navigation checks',
    description: 'Identify supported menu and navigation references before removing pages.'
  },
  {
    title: 'Custom field scanning',
    description: 'Review page references stored in supported WordPress custom fields.'
  },
  {
    title: 'Reference scanning dashboard',
    description: 'Review detected references from a dedicated WordPress admin dashboard.'
  },
  {
    title: 'Searchable results and reporting',
    description: 'Find and review detected references with searchable results and reports.'
  }
];

export default function SafeDeletePro() {
  usePageTitle('SafeDelete Pro | DevnDespro');

  return (
    <div className="safedelete-page">
      <section className="section">
        <div className="container">
          <div className="safedelete-hero">
            <div>
              <p className="safedelete-eyebrow">
                DEVNDESPRO WORDPRESS PLUGIN
              </p>

              <h1>
                SafeDelete <em>Pro</em>
              </h1>

              <p className="lede">
                Know what depends on your content before you delete it.
              </p>

              <p>
                SafeDelete Pro extends the Free plugin with deeper
                reference checks across supported Elementor content,
                WordPress menus, and custom fields.
              </p>

              <div className="safedelete-actions">
                <a
                  className="btn btn-primary"
                  href="#pricing"
                >
                  View pricing
                </a>

                <a
                  className="btn btn-ghost"
                  href="https://wordpress.org/plugins/devndespro-safedelete/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get SafeDelete Free
                </a>
              </div>
            </div>

            <div className="safedelete-price-card">
              <p>SAFEDELETE PRO</p>
              <h2>$5</h2>
              <p>One-time purchase</p>
              <p>Works alongside SafeDelete Free.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Go beyond direct link detection.</h2>
          <p className="lede">
            Understand more about where your WordPress pages
            are referenced before moving them to Trash.
          </p>

          <div className="safedelete-feature-grid">
            {features.map((feature) => (
              <article
                className="safedelete-feature"
                key={feature.title}
              >
                <span className="safedelete-feature-icon" aria-hidden="true">
  <i className="fa-solid fa-check"></i>
</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sd-premium-section" id="pricing">
  <div className="container">

    <div className="sd-premium-heading">
      <span className="sd-premium-eyebrow">
        SIMPLE PRICING
      </span>

      <h2>Support SafeDelete Pro with a coffee <i className="fa-solid fa-mug-hot" aria-hidden="true"></i></h2>

      <p>
        For about the price of a coffee, get advanced
        WordPress reference scanning and support the
        continued development of SafeDelete.
      </p>
    </div>

    <div className="sd-premium-grid">

      <div className="sd-premium-visual">
        <div className="sd-premium-photo">
          <img
            src="/images/safedelete-coffee.webp"
            alt="Fresh cappuccino with latte art and coffee beans"
            loading="lazy"
          />

          <div className="sd-premium-photo-label">Made with care</div>
        </div>

        <div className="sd-premium-message">
          <i className="fa-solid fa-mug-hot" aria-hidden="true"></i>
          <p>
            A small coffee today helps keep
            SafeDelete growing tomorrow.
          </p>
        </div>
      </div>

      <div className="sd-premium-card">

        <span className="sd-premium-pill">
          ONE-TIME PURCHASE
        </span>

        <h3>SafeDelete Pro</h3>

        <div className="sd-premium-price-row">
          <strong>$5</strong>

          <div>
            <span>USD</span>
            <span>One-time payment</span>
            <span>No subscription</span>
          </div>
        </div>

        <div className="sd-premium-divider" />

        <ul className="sd-premium-benefits">
  <li><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><span>Deeper reference checks before deleting</span></li>
  <li><i className="fa-solid fa-puzzle-piece" aria-hidden="true"></i><span>Elementor and supported menu scanning</span></li>
  <li><i className="fa-solid fa-database" aria-hidden="true"></i><span>Supported custom field scanning</span></li>
  <li><i className="fa-solid fa-chart-column" aria-hidden="true"></i><span>Reference dashboard with searchable results</span></li>
  <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i><span>Works alongside SafeDelete Free</span></li>
</ul>

        <a
  className="sd-premium-buy"
  href="https://buy.stripe.com/28EeVefnvfpA6sy4Kh3oA00"
  target="_blank"
  rel="noopener noreferrer"
>
  <span>Get SafeDelete Pro - $5</span>
  <i className="fa-solid fa-mug-hot" aria-hidden="true"></i>
  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
</a>

        <p className="sd-premium-security">
          Secure checkout and download delivery
          are being prepared.
        </p>

        <p className="sd-premium-requirement">
          Requires SafeDelete Free.
        </p>

      </div>
    </div>
  </div>
</section>

      <section className="section">
        <div className="container">
          <h2>Frequently asked questions</h2>

          <div className="safedelete-faq">
            <h3>Do I need SafeDelete Free?</h3>
            <p>
              Yes. SafeDelete Pro works alongside the Free plugin.
            </p>

            <h3>Is the payment recurring?</h3>
            <p>
              No. SafeDelete Pro is offered as a $5 one-time purchase.
            </p>

            <h3>Does it detect every dependency?</h3>
            <p>
              No. Reference scanning has limitations and may not
              detect every dependency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
