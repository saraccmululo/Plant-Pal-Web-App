import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore'; 
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from '../Authentication/AuthContext.jsx';
import useSortedAndFilteredPlants from "../../hooks/useSortedAndFilteredPlants.js";
import useFetchPlantsDb from "../../hooks/useFetchPlantsDb.js";
import Header from '../shared/Header/Header';
import NavHeader from '../shared/Header/NavHeader.jsx';
import SortFilter from '../SortFilter/SortFilter';
import PlantList from '../PlantList/PlantList';
import PlantCount from '../shared/PlantCount/PlantCount.jsx'
import Pagination from '../shared/Pagination/Pagination.jsx';
import Footer from '../shared/Footer/Footer';
import styles from './PlantDashboard.module.css';

const PlantDashboard = ({searchTerm, showMenu, toggleMenu, closeMenu, isDashboard}) => {
  const [sortBy, setSortBy] = useState('none');
  const [filterType, setFilterType] = useState('none');
  const [filterText, setFilterText] = useState('');
  const { currentUser } = useAuth();
  const { plants, setPlants, isLoading } = useFetchPlantsDb();
  
  useEffect(() => {
      document.title = "Plant Pals - My Plant Collection";
    }, []);
    
  const handleDelete = async (plantId) => {
    if (currentUser) {
      try {
        const plantDocRef = doc(db, "plants", currentUser.uid, "userPlants", plantId);
        await deleteDoc(plantDocRef);
				toast.success("Plant removed successfully!", {
          className: styles.customToast
        });

      setPlants(prevPlants => prevPlants.filter(plant => plant.id !== plantId));
				
      } catch (error) {
        console.error("Error removing plant: ", error);
        toast.error("failed to delete plant.");
      }
    }
  };

  const sortedAndFilteredPlants = useSortedAndFilteredPlants(plants, filterType, filterText, sortBy);

  if (!currentUser) {
    return (
      <section className={styles.authContainer}>
        <section className={styles.authBox}>
          <h2 className={styles.authBoxH2}>Please log in to view your plant collection:</h2>
          <Link className={styles.authBoxLink} to="/login" >Go to Login</Link>
        </section>
      </section>
    );
  }

  return (
    <section className={styles.dashboardContainer}>
    <section className={styles.container}>
      <Header />
      <NavHeader 
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        isDashboard={isDashboard}/>

      <main className={styles.mainContent}>
				<section className={styles.addMoreButtonContainer}>
          <Link to="/">
            <button className={styles.addMoreButton}>Add More Plants</button>
          </Link>
        </section>
        <SortFilter 
          sortBy={sortBy} 
          filterType={filterType} 
          filterText={filterText} 
          setSortBy={setSortBy} 
          setFilterType={setFilterType} 
          setFilterText={setFilterText}
          plants={plants}
          isHomepage={false}
        /> 
        <PlantCount 
          isLoading={isLoading}
          plants={plants}
        />
        <Pagination 
          filteredPlants={sortedAndFilteredPlants}
          searchTerm={searchTerm}
          filterType={filterType}
          filterText={filterText}
          onDelete={handleDelete}
          isLoading={isLoading}
          isDashboard={true} 
        />
      </main>
    </section>
      <Footer />
    </section>
  );
}

export default PlantDashboard;
