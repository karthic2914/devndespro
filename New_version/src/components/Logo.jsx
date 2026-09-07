import { Link } from 'react-router-dom';

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" onClick={onClick} aria-label="devndespro home">
      <img
        src="/images/DDDP_logo.png"
        alt="devndespro"
        className="logo-img"
        width="781"
        height="394"
      />
    </Link>
  );
}
