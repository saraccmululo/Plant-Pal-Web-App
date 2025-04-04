import { Link } from "react-router-dom";
import LoginLogoutButton from "../../Authentication/LoginLogoutButton/LoginLogoutButton";
import logo from '../../../assets/logoNew.png';
import styles from './NavHeader.module.css';

const NavHeader = ({isDashboard, showMenu, closeMenu, toggleMenu}) => {
  
  return (
    <nav className={styles.navHeader}>
      <button 
        className={styles.hamburgerMenu} 
        onClick={toggleMenu}
        aria-label="Toggle navigation menu">
        <span>{showMenu?  <span>&nbsp;</span> : '☰'}</span>
      </button>

      <section className={styles.centerContent}>
       <Link to="/"> 
        <img src={logo} alt="Plant Pals Logo" className={styles.logo} /> 
      </Link>
      <h1>{!isDashboard ? 'My Plant Pals' : 'My Plant Collection'}</h1>
      </section>

      <nav className={showMenu? styles.mobileMenuOpen : styles.mobileMenu}>
         <button className={styles.closeMenuButton} onClick={closeMenu}>
          ✖
        </button>
        {!isDashboard ? (
          <>
          <Link to="/plant-dashboard" className={styles.dashboardLink}>
        <h4>My Plant Collection</h4>
        </Link>
        <LoginLogoutButton />
        </>
        ) : (
          <>
          <Link to="/" className={styles.dashboardLink}><h4>Home</h4></Link>
        <LoginLogoutButton />
        </>
      )}
      </nav>
      {showMenu && (
        <div className={styles.overlay} onClick={closeMenu}></div>
      )}
    </nav>
  )
}

export default NavHeader;