import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="admin-navbar">
      <div className="nav-logo">Admin</div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
        <Link to="/admin/sellers" onClick={() => setIsOpen(false)}>Approve Sellers</Link>
        <Link to="/admin/books" onClick={() => setIsOpen(false)}>Books</Link>
        <Link to="/admin/users" onClick={() => setIsOpen(false)}>Users</Link>
        <Link to="/admin/stats" onClick={() => setIsOpen(false)}>Statistics</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="nav-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};

export default AdminNavbar;