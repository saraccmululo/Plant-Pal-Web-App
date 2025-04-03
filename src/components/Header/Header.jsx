import { useState } from 'react';
import logo from '../../assets/logoNew.png';
import { Link, useLocation } from 'react-router-dom';
import LoginLogoutButton from '../Authentication/LoginLogoutButton/LoginLogoutButton.jsx';
import styles from './Header.module.css';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
  };
  
  const isDashboard = location.pathname === '/plant-dashboard';

  return (
    <header className={isDashboard? styles.dashboardHeader : styles.header}>
      <figure className={styles.logoTitle}> 
       <Link to="/"> 
        <img src={logo} alt="Plant Pals Logo" className={styles.logo} /> 
       </Link>
          <figcaption>
          {isDashboard ? (
            <h2 className={styles.headerH2}>My Plant Collection</h2>
          ) : (
              <h1 className={styles.headerH1}>My Plant Pals</h1> 
          )}
          </figcaption>
      </figure>
      <section className={styles.desktopMenu}>
        {!isDashboard && (
          <Link to="/plant-dashboard" className={styles.plantCollectionLink}>
          <h4 className={styles.headerH4}>My Plant Collection</h4>
          </Link>)}
        <LoginLogoutButton />
      </section>

      <button 
      className={styles.hamburgerMenu} 
      onClick={toggleMenu}
      aria-label="Toggle navigation menu"
      >
        <span>{showMenu? '✖' : '☰'}</span>
      </button>

      <nav className={showMenu? styles.mobileMenuOpen : styles.mobileMenu}>
        {!isDashboard && (<Link to="/plant-dashboard" className={styles.dashboardLink}>
        <h4>My Plant Collection</h4>
        </Link>)}
        
        <LoginLogoutButton />
      </nav>
    </header>   
  )}
      
export default Header;