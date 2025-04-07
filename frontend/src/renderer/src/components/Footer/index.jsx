import React from 'react';
import './styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-title">Pixly</p>
      <p className="footer-caption">Made with 💜 for creators everywhere.</p>
      <p className="footer-copyright">© {new Date().getFullYear()} Pixly. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
