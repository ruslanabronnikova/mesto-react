import React from 'react';
import logo from '../images/logo/logo.svg'

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип Место" />
    </header>
  );
}

export default Header;