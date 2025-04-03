import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore'; 
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from '../Authentication/AuthContext.jsx';
import useSortedAndFilteredPlants from "../../hooks/useSortedAndFilteredPlants.js";
import useFetchPlantsDb from "../../hooks/useFetchPlantsDb.js";
import Header from '../Header/Header';
import SortFilter from '../SortFilter/SortFilter';
import PlantList from '../PlantList/PlantList';
import Footer from '../Footer/Footer';
import styles from './PlantDashboard.module.css';

const PlantDashboard = () => {
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
				toast.success("Plant removed successfully!");

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
    <section className={styles.container}>
      <Header />
      <main>
        <section className={styles.dashboardH2Container}>
        <h2 className={styles.dashboardH2}>My Plant Collection</h2>
        </section>
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
          isHomepage={false}
        /> 
        {!isLoading && 
        (<section className={styles.plantCountContainer}>
          {plants.length > 0 ? 
          (<p className={styles.plantCount}>You have <strong>{plants.length} plants&nbsp;</strong> in your collection.</p>
          ):( 
          <p className={styles.plantCount}>You haven't added any plants yet.</p>)}
        </section>
        )}
        <PlantList 
        filteredPlants={sortedAndFilteredPlants} 
        isLoading={isLoading} 
        onDelete={handleDelete} 
        isDashboard={true}
        />
      </main>
      <Footer />
    </section>
  );
}

export default PlantDashboard;
