import { useEffect, useState } from 'react';
import { db, auth } from '../../firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore'; 
import useFetchPlantsDb from "../../hooks/useFetchPlantsDb.jsx";
import Header from '../Header/Header';
import SortFilter from '../SortFilter/SortFilter';
import PlantList from '../PlantList/PlantList';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import styles from './PlantDashboard.module.css';

const PlantDashboard = () => {
  const [sortBy, setSortBy] = useState('');
  const [filterType, setFilterType] = useState('none');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
      document.title = "Plant Pals - My Plant Collection";
    }, []);
    
  const { plants, setPlants, isLoading } = useFetchPlantsDb();

  const handleDelete = async (plantId) => {
    if (auth.currentUser) {
      try {
        const plantDocRef = doc(db, "plants", auth.currentUser.uid, "userPlants", plantId);
        await deleteDoc(plantDocRef);
				toast.success("Plant removed successfully!");

        // Manually update the state by filtering out the deleted plant
      setPlants(prevPlants => prevPlants.filter(plant => plant.id !== plantId));
				
      } catch (error) {
        console.error("Error removing plant: ", error);
        toast.error("failed to delete plant.");
      }
    }
  };

  const sortedAndFilteredPlants = plants
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
    return 0; // This will be when "None" is selected
  });

  if (!auth.currentUser) {
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
    <section className={styles.container}>
      <Header />
      <main>
        <h2 className={styles.dashboardH2}>My Plant Collection</h2>
				
          <Link to="/">
            <button className={styles.addMoreButton}>Add More Plants</button>
          </Link>
          <SortFilter 
            sortBy={sortBy} 
            filterType={filterType} 
            filterText={filterText} 
            setSortBy={setSortBy} 
            setFilterType={setFilterType} 
            setFilterText={setFilterText}
            isHomepage={false}
          /> 
        
        <PlantList filteredPlants={sortedAndFilteredPlants} isLoading={isLoading} onDelete={handleDelete} isDashboard={true}/>
      </main>
      <Footer />
    </section>
  );
}

export default PlantDashboard;
