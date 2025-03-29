import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SearchBar from './components/SearchBar/SearchBar.jsx';
import SortFilter from './components/SortFilter/SortFilter.jsx';
import PlantList from './components/PlantList/PlantList.jsx';
import Footer from './components/Footer/Footer.jsx';
import LoginPage from './components/Authentication/LoginPage/LoginPage.jsx';
import PlantDashboard from './components/PlantDashboard/PlantDashboard.jsx';
import PrivateRoute from './components/Authentication/PrivateRoute.jsx';
import { AuthProvider } from './components/Authentication/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header.jsx';
import logo from './assets/logoNew.png';
import styles from './App.module.css';

const App = () => {
  const [plantsData, setPlantsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [filterType, setFilterType] = useState('none');
  const [filterText, setFilterText] = useState('');
  const searchInputRef = useRef(null);
  
  useEffect(() => {
    document.title = "Plant Pals - Homepage";
  }, [])

  const API_KEY = import.meta.env.VITE_API_KEY; 
  
  useEffect(() => {
  if(searchTerm) {
    const fetchApi = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://perenual.com/api/v2/species-list?key=${API_KEY}&q=${searchTerm}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const json = await response.json();
        
        console.log (json)

        const plantCardData=json.data
        .filter((plant)=>plant.id <=3000)
        .map((plant) => ({
          id: plant.id ,
          common_name: plant.common_name,
          scientific_name: plant.scientific_name.join(', '),
          thumbnail: plant.default_image?.thumbnail||logo,
        }));

        console.log("Filtered plants count:", plantCardData.length); 

        setPlantsData(plantCardData)

      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchApi();
  }
  }, [searchTerm]);

  function handleSearch() {
    if (searchInputRef.current) {
      setSearchTerm(searchInputRef.current.value);
      searchInputRef.current.value ='';
    }
  }

  const sortedAndFilteredPlants = plantsData
  .filter((plant) => {
    if (filterType === "none" || filterText === "") return true;
    const searchField = filterType === "common-name" ? plant.common_name : plant.scientific_name;
    return searchField.toLowerCase().includes(filterText.toLowerCase());
  })
  .sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.common_name.localeCompare(b.common_name);
    } else if (sortBy === "date") {
      const dateA = a.date_created ? a.date_created.toDate() : new Date(0);
      const dateB = b.date_created ? b.date_created.toDate() : new Date(0);
      return dateB - dateA;
    }
    return 0;
  });

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






