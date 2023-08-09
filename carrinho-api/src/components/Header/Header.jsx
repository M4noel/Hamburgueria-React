import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/img/logo.png'; 
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo__url">
          <img className="logo" src={logoImage} alt="Logo do Lanche.on.Net" />
          <h1 className="logo__text">Hamburgueria</h1>
        </Link>
        <nav className={`nav ${isMenuOpen ? 'nav--open' : ''}`}>
          <div className="menu-toggle" onClick={toggleMenu}>
            <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">Home</Link>
            </li>
            <li className="nav__item">
              <Link to="/carrinho" className="nav__link">Carrinho</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
