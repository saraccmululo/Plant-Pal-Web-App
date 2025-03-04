import { useState } from 'react';
import PlantDetail from './PlantDetails.jsx';

export default function PlantCard({plant, onDelete}) {
const [showPlantDetail, setShowPlantDetail] = useState(false);

const handleClick = () => {
	setShowPlantDetail(showPlantDetail=>!showPlantDetail);
}
	if(!plant) return null

	return (
    <article className="plant-card">
    	<img src={plant.thumbnail} alt={plant.common_name}/>
    	<section className="plant-names">
      	<h3>{plant.common_name.charAt(0).toUpperCase() + plant.common_name.slice(1).toLowerCase()}</h3>
      	<p><strong>Scientific name: </strong>{plant.scientific_name}</p>
    	</section>
			<section className="plant-action-buttons">
				<button onClick={handleClick}>Details</button>
				{showPlantDetail && <PlantDetail id={plant.id}/>}
				<button>Add</button>
     	 	<button onClick={()=>onDelete(plant.id)}>Remove</button>
    	</section>
  	</article>
);
}

