import { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import logo from './assets/logo-without-background.png';
import SearchBar from './components/SearchBar.jsx';
import PlantList from './components/PlantList.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/login.jsx';
import PlantDashboard from './components/PlantDashBoard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const App = () => {
  const[searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  function handleSearch() {
    setSearchTerm(searchInputRef.current.value);
    searchInputRef.current.value ='';
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/plant-dashboard" element={
          <PrivateRoute> <PlantDashboard /> </PrivateRoute>
          } />
        <Route path="/" element={
          <section className="container">
            <header>
              <figure className="logo-title"> 
                <img src={logo} alt="Plant Pals Logo" className="logo" />
                  <figcaption>
                    <h1>My Plant Pals</h1>
                  </figcaption>
              </figure>
              <h2>The help you need to manage your plant collection!</h2>
              <h3>Find the care guide for your plants by entering their names below:</h3>
            </header>
            <main>
              <SearchBar searchInputRef = {searchInputRef} onSearch={handleSearch}/>
            <PlantList searchTerm={searchTerm}/>
            </main>
            <Footer />
          </section>
        } />
      </Routes>
    </Router>
  );
}


export default App;






