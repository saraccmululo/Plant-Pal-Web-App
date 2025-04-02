import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantDetails from '../PlantDetails/PlantDetails.jsx';
import fetchPlantDetails from '../PlantDetails/fetchPlantDetailsApi.jsx';
import { auth, db } from "../../firebase/firebase.js";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../Authentication/AuthContext";
import { toast } from "react-toastify";
import styles from "./PlantCard.module.css";

const PlantCard = ({plant, onDelete, isDashboard}) => {
const [showPlantDetail, setShowPlantDetail] = useState(false);
const navigate = useNavigate();
const { currentUser } = useAuth();

const handleDetailsClick = () => {
	setShowPlantDetail(prev=>!prev);
}

const handleAddClick = async () => {
	if (currentUser) {
		try {
			const userPlantsRef = collection (db, "plants", currentUser.uid, "userPlants");

			const userSavedPlants = await getDocs(userPlantsRef);
			const plantExists = userSavedPlants.docs.some(doc => doc.data().plant_id === plant.id);

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
				date_created: serverTimestamp(),
			});

			toast.success("Plant added successfully!");
			navigate("/plant-dashboard");
		} catch(error) {
			console.error("Error adding plant: ", error);
		}
	} else {
		navigate("/login");
		toast.success('Please login to add a plant')
	}
};

	return (
    <section className={styles.plantContainer}>
      <article className={showPlantDetail? styles.plantCardDetailsOn : styles.plantCard}>
        <img src={plant.thumbnail} alt={`Plant picture of ${plant.common_name}`}/>
        <section className={styles.plantNames}>
          <h3 className={styles.cardH3}>{plant.common_name.charAt(0).toUpperCase() + plant.common_name.slice(1).toLowerCase()}</h3>
          <p className ={styles.plantCardP}><strong>Scientific name: </strong>{plant.scientific_name}</p>
        </section>
        <section className={styles.plantActionButtons}>
          <button className={styles.cardButtons} onClick={handleDetailsClick}>Details</button>
          
          {!isDashboard && (<button className={styles.cardButtons} onClick={handleAddClick}>Add</button>)}
					{isDashboard && (<button className={styles.cardButtons} onClick={()=>onDelete(plant.id)}>Remove</button>)}
          
        </section>
      </article>
      {showPlantDetail && <PlantDetails id={plant.id} isDashboard={isDashboard}/>}
    </section>
  );
}

export default PlantCard;