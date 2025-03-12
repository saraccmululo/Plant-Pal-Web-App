//import { useState } from 'react';
import logo from '../assets/logo-without-background.png';
import { Link } from 'react-router-dom';
import LoginLogoutButton from './LoginLogoutButton.jsx';

const Header = () => {

  return (
    <header>
      <figure className="logo-title"> 
        <img src={logo} alt="Plant Pals Logo" className="logo" />
          <figcaption>
            <h1>My Plant Pals</h1>
          </figcaption>
      </figure>
      <Link to="/plant-dashboard" className="dashboard-link"><h4>My Plant Collection</h4></Link>
      <LoginLogoutButton />
    </header> 
      
  )}
      
export default Header;