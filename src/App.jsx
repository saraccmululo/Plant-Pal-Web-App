import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from './components/Authentication/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import useSortedAndFilteredPlants from "./hooks/useSortedAndFilteredPlants";
import useFetchPlantsApi from './hooks/useFetchPlantsApi.js';
import PrivateRoute from './components/Authentication/PrivateRoute.jsx';
import Header from './components/Header/Header.jsx';
import logo from './assets/logoNew.png';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import SortFilter from './components/SortFilter/SortFilter.jsx';
import PlantList from './components/PlantList/PlantList.jsx';
import LoginPage from './components/Authentication/LoginPage/LoginPage.jsx';
import PlantDashboard from './components/PlantDashboard/PlantDashboard.jsx';
import Footer from './components/Footer/Footer.jsx';
import styles from './App.module.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [filterType, setFilterType] = useState('none');
  const [filterText, setFilterText] = useState('');
  const searchInputRef = useRef(null);
  
  useEffect(() => {
    document.title = "Plant Pals - Homepage";
  }, [])

  const { plantsData, isLoading } = useFetchPlantsApi(searchTerm);

  const handleSearch = () => {
    if (searchInputRef.current) {
      setSearchTerm(searchInputRef.current.value);
      searchInputRef.current.value ='';
    }
  }

  const sortedAndFilteredPlants = useSortedAndFilteredPlants(plantsData, filterType, filterText, sortBy);

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
          <section className={styles.appContainer}>
          <section className={styles.container}>
            <Header />
            <main>
            <h2 className={styles.mainH2}>The help you need to manage your plant collection!</h2>
            <SearchBar searchInputRef = {searchInputRef} onSearch={handleSearch}/>
            <SortFilter
              sortBy={sortBy}
              filterType={filterType}
              filterText={filterText}
              setSortBy={setSortBy}
              setFilterType={setFilterType}
              setFilterText={setFilterText}
              isHomepage={true} 
            />
            <PlantList 
              searchTerm={searchTerm} 
              filteredPlants={sortedAndFilteredPlants} isLoading={isLoading}
              isDashboard={false} />
            </main>
            </section> 
            <Footer />
          </section>
        } />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;






