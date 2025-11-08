import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Info } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <FileText size={24} />
          <span>MCQ Generator</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            <Info size={18} />
            <span>How to Use</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
