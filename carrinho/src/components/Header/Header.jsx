import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/img/logo.png'; 
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo__url">
          <img className="logo" src={logoImage} alt="Logo do Lanche.on.Net" />
          <h1 className="logo__text">Hamburgueria</h1> {/* Novo elemento */}
        </Link>
        <nav className="nav">
          <ul className="nav__list">
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
