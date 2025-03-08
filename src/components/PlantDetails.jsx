import { useState, useEffect } from 'react';

const PlantDetail = ({ id }) => {
 const[plantDetails, setPlantDetails] = useState(null);
 const API_KEY = import.meta.env.VITE_API_KEY; 
	
 useEffect(() => {
	async function fetchApi() {
		try {
			const response = await fetch(`https://perenual.com/api/v2/species/details/${id}?key=${API_KEY}`);
			if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
		const plantDetail = await response.json();
		console.log(plantDetail);
	
		const plantDetailData = {
			id: plantDetail.id ,
			//common_name: plantDetail.common_name,
			//scientific_name: plantDetail.scientific_name.join(', '),
			//thumbnail: plantDetail.default_image?.thumbnail||logo,
			watering: plantDetail.watering,
			sunlight: plantDetail.sunlight.join(', '),
			poisonous_to_pets: plantDetail.poisonous_to_pets? "Yes" : "No",
			description: plantDetail.description,
		};		
		setPlantDetails(plantDetailData)
		} catch (error) {
			console.error(error)
		} 
	}
	fetchApi();
	}, [id]);
			
	if (!plantDetails) {
		return <p>Loading details...</p>;
	}
		
  return (
    <section className="plant-details">
    	{/*<img src={plantDetails.thumbnail} alt={plantDetails.common_name}/>
    	<h3>{plantDetails.common_name.charAt(0).toUpperCase() + plantDetails.common_name.slice(1).toLowerCase()}</h3>
    	<p><strong>Scientific name: </strong>{plantDetails.scientific_name}</p>*/}
			<p><strong>Watering: </strong>{plantDetails.watering}</p>
    	<p><strong>Light: </strong>{plantDetails.sunlight}</p>
    	<p><strong>Pet-friendly:</strong>{plantDetails.poisonous_to_pets}</p> 
			<p><strong>Description:</strong>{plantDetails.description}</p>  
  	</section>
)
}

export default PlantDetail;									