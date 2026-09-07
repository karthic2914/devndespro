import { Link } from 'react-router-dom';

export default function Logo({ onClick, surface = 'auto' }) {
  return (
    <Link
      to="/"
      className={`logo brand ${surface === 'on-dark' ? 'on-dark' : 'on-auto'}`}
      onClick={onClick}
      aria-label="devndespro home"
    >
      <span className="brand-mark" aria-hidden="true">
        <img className="logo-img is-ink" src="/images/DDDP_logo_ink.png" alt="" />
        <img className="logo-img is-cream" src="/images/DDDP_logo_clear.png" alt="" />
      </span>
    </Link>
  );
}
