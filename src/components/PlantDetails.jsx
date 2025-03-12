import { useState, useEffect } from 'react';

const PlantDetails = ({ id }) => {
 const[plantDetails, setPlantDetails] = useState(null);
 const [isLoading, setIsLoading] = useState(false);

 const API_KEY = import.meta.env.VITE_API_KEY; 
	
 useEffect(() => {
	async function fetchApi() {
    setIsLoading(true);
		try {
			const response = await fetch(`https://perenual.com/api/v2/species/details/${id}?key=${API_KEY}`);
			if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
		const plantDetail = await response.json();
		console.log(plantDetail);
	
		const plantDetailData = {
			id: plantDetail.id,
			watering: plantDetail.watering + ".",
			sunlight: plantDetail.sunlight.join(', ') + ".",
			poisonous_to_pets: (plantDetail.poisonous_to_pets? " Yes" : " No") + ".",
			description: (` ${plantDetail.description}`),
		};		
		setPlantDetails(plantDetailData)
		} catch (error) {
			console.error(error)
		} finally {
      setIsLoading(false);
    }
	}
	fetchApi();
	}, [id]);
	
    if (isLoading) {
      return <p className="loadingSpinner"></p>
    }

    if (!plantDetails) {
      return <p>No details were found for this plant</p>;
    }

  return (
    <section className="plant-details">
		  <p><strong>Watering: </strong>{plantDetails.watering}</p>
    	<p><strong>Light: </strong>{plantDetails.sunlight}</p>
    	<p><strong>Pet-friendly:</strong>{plantDetails.poisonous_to_pets}</p> 
			<p><strong>Description:</strong>{plantDetails.description}</p> 
  	</section>
    
)}

export default PlantDetails;									