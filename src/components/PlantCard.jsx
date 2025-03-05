import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantDetail from './PlantDetails.jsx';

export default function PlantCard({plant, onDelete}) {
const [showPlantDetail, setShowPlantDetail] = useState(false);
const navigate = useNavigate();

const handleDetailsClick = () => {
	setShowPlantDetail(showPlantDetail=>!showPlantDetail);
}

const handleAddClick = () => {
	navigate("/login");
};

if(!plant) return null

	return (
    <article className="plant-card">
    	<img src={plant.thumbnail} alt={plant.common_name}/>
    	<section className="plant-names">
      	<h3>{plant.common_name.charAt(0).toUpperCase() + plant.common_name.slice(1).toLowerCase()}</h3>
      	<p><strong>Scientific name: </strong>{plant.scientific_name}</p>
    	</section>
			<section className="plant-action-buttons">
				<button onClick={handleDetailsClick}>Details</button>
				{showPlantDetail && <PlantDetail id={plant.id}/>}
				<button onClick={handleAddClick}>Add</button>
     	 	<button onClick={()=>onDelete(plant.id)}>Remove</button>
    	</section>
  	</article>
);
}

