import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';
import { useAuth } from '../Authentication/AuthContext.jsx';
import styles from './PlantDetails.module.css';
import fetchPlantsDetails from './fetchPlantDetails.jsx';

const PlantDetails = ({ id, isDashboard }) => {
 const[plantDetails, setPlantDetails] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
 const { currentUser, userLoggedIn } = useAuth();

 useEffect(() => {
	const fetchData = async () => {
		setIsLoading(true);
		let data = null;
		
		try {
		if (!isDashboard) {
			data = await fetchPlantsDetails(id);
		
		} else {
			if(currentUser) {
			const docRef = doc (db, 'plants', currentUser.uid, 'userPlants', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				data = docSnap.data().plant_details;
				} else {
					console.log("No such document");
				}
			} else {
				console.log("User is not authenticated");
			} 
		}
			setPlantDetails(data);

			} catch (error) {
				console.error("Error fetching plant details:", error);
			} finally {
				setIsLoading (false);
			}
	};
	
	fetchData();
}, [id, isDashboard, userLoggedIn]);
	
    if (isLoading) {
      return (
	  		<section className={styles.loadingContainer}>
					<p className={styles.loadingSpinner}></p>
				</section>
	  	)
		}
    if (!plantDetails) {
      return <p>No details were found for this plant</p>;
    }

  return (
    <section className={styles.plantDetails}>
		  <p className={styles.detailsP}><strong>Watering: </strong>{plantDetails.watering}</p>
    	<p className={styles.detailsP}><strong>Light: </strong>{plantDetails.sunlight}</p>
    	<p className={styles.detailsP}><strong>Pet-friendly: </strong>{plantDetails.poisonous_to_pets}</p> 
			<p className={styles.detailsP}><strong>Description: </strong>{plantDetails.description}</p> 
  	</section>
)}

export default PlantDetails;									