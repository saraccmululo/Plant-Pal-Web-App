import { useState, useEffect } from 'react';
import styles from './PlantDetails.module.css';
import fetchPlantsDetails from './fetchPlantDetails.jsx';

const PlantDetails = ({ id }) => {
 const[plantDetails, setPlantDetails] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
	
 useEffect(() => {
	const fetchData = async () => {
		setIsLoading(true);
		const data = await fetchPlantsDetails (id);
		setPlantDetails(data);
		setIsLoading (false); 	
	};
	
	fetchData();
}, [id]);
	
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
		  <p><strong>Watering: </strong>{plantDetails.watering}</p>
    	<p><strong>Light: </strong>{plantDetails.sunlight}</p>
    	<p><strong>Pet-friendly:</strong>{plantDetails.poisonous_to_pets}</p> 
			<p><strong>Description:</strong>{plantDetails.description}</p> 
  	</section>
)}

export default PlantDetails;									