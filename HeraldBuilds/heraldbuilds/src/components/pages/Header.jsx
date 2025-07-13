import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="site-title">
        <img
          src="/main-logo.png"
          alt="Herald Builds Logo"
          className="site-logo"
        />
        <span>Herald Builds</span>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/troubleshooting">Troubleshooting</Link>
        <Link to="/guides">PC Guides</Link>
        <Link to="/tools">Tools</Link>
        <Link to="/about">About Us</Link>
        <Link to="/faq">FAQ</Link>
      </nav>
    </header>
  );
}
