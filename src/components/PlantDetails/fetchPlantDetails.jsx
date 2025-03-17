
const fetchPlantDetails = async (id) => {
	const API_KEY = import.meta.env.VITE_API_KEY;
  
	try {
	  const response = await fetch(`https://perenual.com/api/v2/species/details/${id}?key=${API_KEY}`);
	  if (!response.ok) {
		throw new Error(`Error: ${response.status}`);
	  }
	  
	  const plantDetail = await response.json();
  
	  return {
		watering: plantDetail.watering,
		sunlight: plantDetail.sunlight.join(', '),
		poisonous_to_pets: plantDetail.poisonous_to_pets ? "Yes" : "No",
		description: plantDetail.description,
	  };
	} catch (error) {
	  console.error("Error fetching plant details:", error);
	  return null; 
	}
  };
  
  export default fetchPlantDetails;
  