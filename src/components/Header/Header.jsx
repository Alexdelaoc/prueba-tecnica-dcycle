import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return(
  <header className="header">
    <p>Prueba Técnica Dcycle</p>
    <Link to="/" className="header__link">Prueba 1</Link>
    <Link to="/2" className="header__link">Prueba 2</Link>
  </header>
  ) 
};

export default Header;
