import React from 'react';
import '../Footer/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <p className="copyright">&copy; 2023 Your Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
