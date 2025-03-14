import { useState } from 'react';
import logo from '../assets/logo-without-background.png';
import { Link, useLocation } from 'react-router-dom';
import LoginLogoutButton from './LoginLogoutButton.jsx';
import styles from './Header.module.css';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(showMenu => !showMenu);
  };
  
  return (
    <header>
      <figure className={styles.logoTitle}> 
        <img src={logo} alt="Plant Pals Logo" className={styles.logo} />
          <figcaption>
          <Link to="/">
              <h1>My Plant Pals</h1> 
          </Link>
          </figcaption>
      </figure>
      <section className={styles.desktopMenu}>
        {location.pathname !== '/plant-dashboard' && (
          <Link to="/plant-dashboard" className={styles.dashboardLink}>
          <h4>My Plant Collection</h4>
          </Link>)}
        <LoginLogoutButton />
      </section>

      <button className={styles.hamburgerMenu} onClick={toggleMenu}>
        {showMenu? '✖' : '☰'}
      </button>

      <nav className={showMenu? styles.mobileMenuOpen : styles.mobileMenu}>
        {location.pathname !== '/plant-dashboard' && (<Link to="/plant-dashboard" className={styles.dashboardLink}>
        <h4>My Plant Collection</h4>
        </Link>)}
        
        <LoginLogoutButton />
      </nav>
    </header>   
  )}
      
export default Header;