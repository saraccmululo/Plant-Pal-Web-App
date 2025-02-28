
export default function PlantCard({plant}) {
	if(!plant) return null
	
	return (
    <article className="plant-card">
        <img src={plant.thumbnail} alt={plant.common_name}/>
        <section className="plant-details">
            <h3>{plant.common_name}</h3>
            <p><strong>Scientific name:</strong>{plant.scientific_name}</p>
            <p><strong>Watering: </strong>{plant.watering}</p>
            <p><strong>Light: </strong>{plant.sunlight}</p>
            {/*<p><strong>Type of soil: </strong>well-draining, consider ammending it with orchid bark, perlite and coco chunks.</p>*/}
						<p><strong>Pet-friendly:</strong>{plant.poisonous_to_pets}</p>
        </section>
        <section className="delete-plant">
            <button>Remove</button>
        </section>
    </article>
);
}

