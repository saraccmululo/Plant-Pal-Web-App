import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
//import logo from './assets/logo-without-background.png';
import SearchBar from './components/SearchBar.jsx';
import PlantList from './components/PlantList.jsx';
import Footer from './components/Footer.jsx';
import LoginPage from './components/LoginPage.jsx';
import PlantDashboard from './components/PlantDashBoard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
//import { Link } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { ToastContainer } from "react-toastify";
//import LoginLogoutButton from './components/LoginLogoutButton.jsx';
import Header from './components/Header.jsx';

const App = () => {
  const[searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  function handleSearch() {
    setSearchTerm(searchInputRef.current.value);
    searchInputRef.current.value ='';
  };

  return (
    <AuthProvider>
    <Router>
    <ToastContainer position="top-right" 
                    autoClose={3000} 
                    hideProgressBar={false} 
                    closeOnClick 
                    pauseOnHover 
                    draggable />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/plant-dashboard" element={
          <PrivateRoute> <PlantDashboard /> </PrivateRoute>
          } />
        <Route path="/" element={
          <section className="container">
            <Header />
            <main>
            <h2>The help you need to manage your plant collection!</h2>
            <SearchBar searchInputRef = {searchInputRef} onSearch={handleSearch}/>
            <PlantList searchTerm={searchTerm}/>
            </main>
            
            <Footer />
          </section>
        } />
      </Routes>
    </Router>
    </AuthProvider>
  );
}


export default App;






