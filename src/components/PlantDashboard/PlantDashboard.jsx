import { useEffect, useState } from 'react';
import { db, auth } from '../../firebase/firebase';
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore'; 
import Header from '../Header/Header';
import PlantCard from '../PlantCard/PlantCard';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import styles from './PlantDashboard.module.css';

const PlantDashboard = () => {
  const [plants, setPlants] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [filterText, setFilterText] = useState("");
  const [filterType, setFilterType] = useState("none")

  
  useEffect(() => {
      document.title = "Plant Pals - My Plant Collection";
    }, [])
    
  useEffect(() => {
    if (auth.currentUser) {
      const plantRef = collection(db, "plants", auth.currentUser.uid, "userPlants");
      const q = query(plantRef);

      getDocs(q).then((querySnapshot) => {
        const plantsData = [];
        querySnapshot.forEach((doc) => {
					
					let plant = doc.data();
          plant['id'] = doc.id;

          plantsData.push(plant);
          });
        
        setPlants(plantsData);

      }).catch((error) => {
        console.error("Error fetching plants: ", error);
      });
    }
  }, [auth.currentUser]);

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);

    setPlants((prevPlants) => sortPlants(prevPlants, selectedSort));
  };

  const sortPlants = (plantsData, sortOption) => {
    let sortedPlants = [...plantsData];

    if(sortOption === 'alphabetical') {
      sortedPlants.sort((a,b) => a.common_name.localeCompare(b.common_name));
    } else if (sortOption === 'date') {
      sortedPlants.sort((a,b) =>{
       const dateA = a.date_created? a.date_created.toDate(): new Date(0);
        const dateB = b.date_created? b.date_created.toDate(): new Date (0);
      return dateB - dateA;
    });
  }
  return sortedPlants;
  };

  const filteredPlants = plants.filter((plant) => {
    if (filterType === "none" || filterText === "") return true; // No filter applied if no filter type or text is set

    const searchField = filterType === "common-name" ? plant.common_name : plant.scientific_name;
    return searchField.toLowerCase().includes(filterText.toLowerCase());
  });

  const handleDelete = async (plantId) => {
    if (auth.currentUser) {
      try {
        const plantDocRef = doc(db, "plants", auth.currentUser.uid, "userPlants", plantId);
        await deleteDoc(plantDocRef);

        // Remove the deleted plant from the state to update the UI
        setPlants(plants.filter(plant => plant.id !== plantId));
				
        console.log("Plant deleted successfully!");
				toast.success("Plant removed successfully!");
				
      } catch (error) {
        console.error("Error removing plant: ", error);
        toast.error("failed to delete plant.");
      }
    }
  };

  if (!auth.currentUser) {
    return (
      <section>
        <p>Please log in to view your plant collection.</p>
        <Link to="/login">Go to Login</Link>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <Header />
      <main>
        <h2>My Plant Collection</h2>
				<nav>
          <Link to="/">
            <button>Add More Plants</button>
          </Link>
          <label>Sort by:</label>
          <select value={sortBy || ''} onChange={handleSortChange}>
            <option value="alphabetical">Alphabetical</option>
            <option value="date">Creation Date</option>
          </select>
          <label>Filter by:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} >
            <option value="none"> None</option>
            <option value="common-name">Common name</option>
            <option value="scientific-name">Scientific Name</option>
          </select>
          <input
          type="text"
          placeholder="Search plants..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        </nav>
        <ul className={styles.plantList}>
          {plants.length === 0 && <p> No plants added yet.</p>}
          {plants.length > 0 && filteredPlants.length ===0 && (<p>No plants match your search</p>)}

          {filteredPlants.length > 0 && filteredPlants.map((plant) => (
              <li key={plant.id}>
                <PlantCard key={plant.id} plant={plant} onDelete={handleDelete} isDashboard={true} />
              </li>
            ))
            }
        </ul>
      </main>
      <Footer />
    </section>
  );
}

export default PlantDashboard;
