import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* <img src="/logo.png" alt="Logo" className="logo" /> */}
        <span className="app-name">BookStore</span>
      </div>
      <div className="navbar-right">
        {token ? (
          <button 
            className="nav-button logout-button" 
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-button login-button">Login</Link>
            <Link to="/signup" className="nav-button signup-button">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
