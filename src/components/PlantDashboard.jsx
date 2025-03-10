import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebase';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'; 
import logo from '../assets/logo-without-background.png';
import PlantCard from './PlantCard';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";


const PlantDashboard = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const plantRef = collection(db, "plants", auth.currentUser.uid, "userPlants");
      const q = query(plantRef);

      getDocs(q).then((querySnapshot) => {
        const plantsData = [];
        querySnapshot.forEach((doc) => {
					
					//console.log(doc.data());
					let plant = doc.data();

					plant['id'] = doc.id;
					//console.log(plant);

          plantsData.push(plant);
        });
        //console.log("Fetched plants:", plantsData);  // Check if the plants are being fetched
        setPlants(plantsData);
        
      }).catch((error) => {
        console.error("Error fetching plants: ", error);
      });
    }
  }, [auth.currentUser]);


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
      <div>
        <p>Please log in to view your plant collection.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <section className="container">
      <header>
        <figure className="logo-title"> 
          <Link className="plant-collection-link" to="/">
            <img src={logo} alt="Plant Pals Logo" className="logo" />
            <figcaption>
              <h1>My Plant Pals</h1>
            </figcaption>
          </Link>
        </figure>
      </header>
      <main>
        <h2>My plant collection</h2>
				<Link to="/" className="add-plant-button">
        <button>Add More Plants</button>
      </Link>
				{/*<p className="delete-message" ref={messageRef}></p>*/}
        <ul className="plant-list">
          {plants.length > 0 ? (
            plants.map((plant) => (
              <li key={plant.id}>
                <PlantCard key={plant.id} plant={plant} onDelete={handleDelete} isDashboard={true} />
              </li>
            ))
          ) : (
            <p> No plants added yet.</p>
          )}
        </ul>
      </main>
      <Footer />
    </section>
  );
}

export default PlantDashboard;
