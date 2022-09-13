import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return(
  <header className="header">
    <p>Prueba Técnica Dcycle</p>
    <Link to="/prueba1" className="header__link">Prueba 1</Link>
    <Link to="/prueba2" className="header__link">Prueba 2</Link>
  </header>
  ) 
};

export default Header;
