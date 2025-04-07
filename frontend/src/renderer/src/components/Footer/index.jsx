import React from 'react';
import './styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-title">Trackify</p>
      <p className="footer-caption">Stay on track with your goals</p>
      <p className="footer-copyright">© {new Date().getFullYear()} Trackify. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
