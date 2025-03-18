import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantDetails from '../PlantDetails/PlantDetails.jsx';
import fetchPlantDetails from '../PlantDetails/fetchPlantDetails.jsx';
import { auth, db } from "../../firebase/firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import styles from "./PlantCard.module.css";

const PlantCard = ({plant, onDelete, isDashboard = false}) => {
const [showPlantDetail, setShowPlantDetail] = useState(false);
const navigate = useNavigate();

const handleDetailsClick = () => {
	setShowPlantDetail(showPlantDetail=>!showPlantDetail);
}

const handleAddClick = async () => {
	if (auth.currentUser) {
		try {
			const userPlantsRef = collection (db, "plants", auth.currentUser.uid, "userPlants");

			const querySnapshot = await getDocs(userPlantsRef);
			const plantExists = querySnapshot.docs.some(doc => doc.data().plant_id === plant.id);

			if(plantExists) {
				toast.error ("This plant is already in your collection");
				return;
			}

			const plantDetails = await fetchPlantDetails(plant.id);

			await addDoc(userPlantsRef, {
				plant_id: plant.id,
				common_name: plant.common_name,
				scientific_name: plant.scientific_name,
				thumbnail: plant.thumbnail,
				plant_details: plantDetails,
				date_created: new Date()
			});

			toast.success("Plant added successfully!");
			navigate("/plant-dashboard");
		} catch(error) {
			console.error("Error adding plant: ", error);
		}
	} else {
		navigate("/login");
	}
};

	return (
    <section className={styles.plantContainer}>
      <article className={styles.plantCard}>
        <img src={plant.thumbnail} alt={`Plant picture of ${plant.common_name}`}/>
        <section className={styles.plantNames}>
          <h3>{plant.common_name.charAt(0).toUpperCase() + plant.common_name.slice(1).toLowerCase()}</h3>
          <p className ={styles.plantCardP}><strong>Scientific name: </strong>{plant.scientific_name}</p>
        </section>
        <section className={styles.plantActionButtons}>
          <button onClick={handleDetailsClick}>Details</button>
          
          {!isDashboard && (<button onClick={handleAddClick}>Add</button>)}
					{isDashboard && (<button onClick={()=>onDelete(plant.id)}>Remove</button>)}
          
        </section>
      </article>
      {showPlantDetail && <PlantDetails id={plant.id} isDashboard={isDashboard}/>}
    </section>
  );
}

export default PlantCard;