import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../css/Navbar.css";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={closeMobileMenu}>
          🎬 CineVault
        </Link>
      </div>
      
      <button 
        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link 
          to="/" 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          🏠 Home
        </Link>
        <Link 
          to="/favorites" 
          className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          ❤️ Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;