import React from 'react';
import { Link } from 'react-router-dom'; 
import '../Styles/navbar.css'

const Navbar = () => {
  return (
    <nav id="main-navbar" className="navbar" >
      <div id="navbar-logo" className="logo" >
        <Link to="/" className="nav-link">
          BGPC
        </Link>
      </div>
      <div className="nav-links" >
        <Link to="/" className="nav-link" >
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/post" className="add-button" >
          New Entity
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
