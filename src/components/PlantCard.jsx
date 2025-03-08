import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantDetail from './PlantDetails.jsx';
import PlantDetailsData from './PlantDetailsData.jsx';
import { auth, db } from "../firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";

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

			const PlantDetails = await PlantDetailsData(plant.id);

			await addDoc(userPlantsRef, {
				plant_id: plant.id,
				common_name: plant.common_name,
				scientific_name: plant.scientific_name,
				thumbnail: plant.thumbnail,
				plant_details: PlantDetails,
				date_created: new Date()
			});

			navigate("/plant-dashboard");
		} catch(error) {
			console.error("Error adding plant: ", error);
		}
	} else {
		navigate("/login");
	}
};

	return (
    <article className="plant-card">
    	<img src={plant.thumbnail} alt={`Plant picture of ${plant.common_name}`}/>
    	<section className="plant-names">
      	<h3>{plant.common_name.charAt(0).toUpperCase() + plant.common_name.slice(1).toLowerCase()}</h3>
      	<p><strong>Scientific name: </strong>{plant.scientific_name}</p>
    	</section>
			<section className="plant-action-buttons">
				<button onClick={handleDetailsClick}>Details</button>
				{showPlantDetail && <PlantDetail id={plant.id}/>}
				{!isDashboard && (<button onClick={handleAddClick}>Add</button>)}
     	 	<button onClick={()=>onDelete(plant.id)}>Remove</button>
    	</section>
  	</article>
);
}

export default PlantCard;