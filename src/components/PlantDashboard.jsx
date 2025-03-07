import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebase';
import logo from '../assets/logo-without-background.png';
import PlantCard from './PlantCard';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const PlantDashboard = () => {
	const [plants, setPlants] = useState([]);

	useEffect(() => {
		if (auth.currentUser) {
			const plantRef = db.collection("plants").doc(auth.currentUser.uid).collection("userPlants");
			plantRef.get().then((querySnapshot) => {
				const plantsData = [];
				querySnapshot.forEach((doc) => {
					plantsData.push(doc.data());
				});
				console.log("Fetched plants:", plantsData);  // Check if the plants are being fetched
				setPlants(plantsData);
			}).catch((error) => {
				console.error("Error fetching plants: ", error);
			});
		}
	}, []);

	return (
	<section className="container">
		<header>
			<figure className="logo-title"> 
				<img src={logo} alt="Plant Pals Logo" className="logo" />
					<figcaption>
						<Link to="/">
							<h1>My Plant Pals</h1>
						</Link>
					</figcaption>
			</figure>
			<h2>My plant collection</h2>
		</header>
		<main>
		<ul className="plant-list">
			{plants.length >0 ? (
          plants.map((plant) => (
            <li key={plant.id}>
              <PlantCard plant={plant} isDashboard={true} />
            </li>
          ))
				) : (
					<p> No plants added yet.</p>
				)}
		</ul>
		</main>
		<Footer />
	</section>
	);
}

export default PlantDashboard;