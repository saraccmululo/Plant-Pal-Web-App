import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SearchBar from './components/SearchBar.jsx';
import PlantList from './components/PlantList.jsx';
import Footer from './components/Footer.jsx';
import LoginPage from './components/LoginPage.jsx';
import PlantDashboard from './components/PlantDashBoard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { AuthProvider } from './components/AuthContext';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header.jsx';
import styles from './App.module.css';

const App = () => {
  const[searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  
  useEffect(() => {
    document.title = "Plant Pals - Homepage";
  }, [])

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
          <section className={styles.container}>
            <Header />
            <main>
            <h2 className={styles.mainH2}>The help you need to manage your plant collection!</h2>
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






