import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Student Management</h1>
      <nav className="header-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add">Add Student</Link>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;
