import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom'; 
import { HashLink } from 'react-router-hash-link';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">

          <div className="footer-column">
            <h5 className="footer-title">Site Links</h5>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><HashLink to="/#about" className="footer-link">About</HashLink></li>
              <li><a href="/adopt" className="footer-link">Adopt</a></li>
              <li><a href="/services" className="footer-link">Services</a></li>
              <li><HashLink to="/#contact" className="footer-link">Contact</HashLink></li>
              <li><a href="/login" className="footer-link">Login</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-title">Contact</h5>
            <p className="footer-contact">
              <a href="mailto:pawprints786@outlook.com" className="footer-email">pawprints786@outlook.com</a>
            </p>
          </div>

          <div className="footer-column">
            <h5 className="footer-title">Sign Up</h5>
            <p>Become a member today and start adopting pets!</p>
            <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Pawprints. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
