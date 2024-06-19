import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/navbar.css';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      onLogout();
      await axios.get('https://s51-gpc.onrender.com/logout');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <nav id="main-navbar" className="navbar">
      <div id="navbar-logo" className="logo">
        <Link to="/" className="nav-link">
          BGPC
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/post" className="add-button">
          New Entity
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
