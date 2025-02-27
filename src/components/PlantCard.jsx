
export default function PlantCard() {
	return (
    <article className="plant-card">
        <img src="assets/monstera.jpg" alt="Monstera deliciosa plant image" />
        <section className="plant-details">
            <h3>Plant Name</h3>
            <p><strong>Latin name:</strong></p>
            <p><strong>Species/Genus:</strong></p>
            <p><strong>Watering: </strong>likes to dry out slightly between waterings</p>
            <p><strong>Light: </strong>Bright, indirect</p>
            <p><strong>Type of soil: </strong>well-draining, consider ammending it with orchid bark, perlite and coco chunks.</p>
        </section>
        <section className="plant-actions">
            <button>Edit</button>
            <button>Remove</button>
        </section>
    </article>
);
}

