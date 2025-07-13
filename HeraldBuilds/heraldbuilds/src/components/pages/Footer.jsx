import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/guides">PC Guides</Link>
          <Link to="/troubleshooting">Troubleshooting</Link>
          <Link to="/tools">Tools</Link>
          <Link to="/about">About Us</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className="footer-section">
          <h3>Contact Information</h3>
          <div className="contact-info">
            <address>
              Herald Builds
              <br />
              224, Madaraka
              <br />
              Nairobi, Kenya
              <br />
              Phone: +254 748913742
              <br />
              Email: supportcentre@heraldbuilds.com
              <br />
              Support Hours: Mon–Fri, 9AM–6PM EAT
            </address>
          </div>
          <div className="social-links">
            <a href="#" title="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" title="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" title="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="copyright">
        <p>&copy; 2025 Herald Builds. All rights reserved.</p>
      </div>
    </footer>
  );
}
