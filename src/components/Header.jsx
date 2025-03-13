import { useState } from 'react';
import logo from '../assets/logo-without-background.png';
import { Link, useLocation } from 'react-router-dom';
import LoginLogoutButton from './LoginLogoutButton.jsx';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(showMenu => !showMenu);
  };
  
  return (
    <header>
      <figure className="logo-title"> 
        <img src={logo} alt="Plant Pals Logo" className="logo" />
          <figcaption>
          <Link to="/">
              <h1>My Plant Pals</h1> 
          </Link>
          </figcaption>
      </figure>
      <section className="desktop-menu">
        {location.pathname !== '/plant-dashboard' && (
          <Link to="/plant-dashboard" className="dashboard-link">
          <h4>My Plant Collection</h4>
          </Link>)}
        
        <LoginLogoutButton />
      </section>

      <button className="hamburger-menu" onClick={toggleMenu}>
        {showMenu? '✖' : '☰'}
      </button>

      <nav className={`mobile-menu ${showMenu? 'open' : ''}`}>
        {location.pathname !== '/plant-dashboard' && (<Link to="/plant-dashboard" className="dashboard-link">
        <h4>My Plant Collection</h4>
        </Link>)}
        
        <LoginLogoutButton />
      </nav>
    </header>   
  )}
      
export default Header;