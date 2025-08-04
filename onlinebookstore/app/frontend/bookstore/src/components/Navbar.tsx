import React from 'react'
import { Link } from 'react-router-dom'
import './css/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* <img src="/logo.png" alt="Logo" className="logo" /> */}
        <span className="app-name">BookStore</span>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="nav-button login-button">Login</Link>
        <Link to="/signup" className="nav-button signup-button">Sign Up</Link>
      </div>
    </nav>
  )
}
