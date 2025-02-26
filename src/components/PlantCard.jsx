
export default function PlantCard() {
    return (
        <article className="plant-card">
            <img src="./assets/monstera.jpg" alt="Monstera deliciosa plant Image" />
            <section class="plant-details">
                <h3>Plant Name</h3>
                <p><strong>Latin name:</strong></p>
                <p><strong>Species/Genus:</strong></p>
                <p><strong>Watering: likes to dry out slightly between waterings</strong></p>
                <p><strong>Light: Bright, indirect</strong></p>
                <p><strong>Type of soil: well-draining</strong></p>
            </section>
            <section class="plant-actions">
                <button>Edit</button>
                <button>Remove</button>
            </section>
      </article>
    );
}

