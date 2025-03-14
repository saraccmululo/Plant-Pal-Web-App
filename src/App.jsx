import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SearchBar from './components/SearchBar/SearchBar.jsx';
import PlantList from './components/PlantList/PlantList.jsx';
import Footer from './components/Footer/Footer.jsx';
import LoginPage from './components/Authentication/LoginPage/LoginPage.jsx';
import PlantDashboard from './components/PlantDashboard/PlantDashboard.jsx';
import PrivateRoute from './components/Authentication/PrivateRoute.jsx';
import { AuthProvider } from './components/Authentication/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header.jsx';
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






