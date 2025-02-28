import logo from '../assets/logo-without-background.png';
import { useState, useEffect } from 'react';
import PlantCard from './PlantCard';

export default function PlantList({searchTerm}) {
    const [data, setData] = useState([]);
    const API_KEY = import.meta.env.VITE_API_KEY; 

    useEffect(() => {
    if(searchTerm) {
      async function fetchApi() {
        try {
          const response = await fetch(`https://perenual.com/api/v2/species/details/[ID]?key=${API_KEY}&q=${searchTerm}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const json = await response.json();
          
          const plantCardData=json.data.map((plant) =>({
            id: plant.id,
            common_name: plant.common_name,
            scientific_name: plant.scientific_name.join(', '),
            thumbnail: plant.default_image?.thumbnail||logo,
            watering: plant.watering,
            sunlight: plant.sunlight.join(', '),
            poisonous_to_pets: plant.poisonous_to_pets? "Yes" : "No",
          }));

          setData(plantCardData);
          console.log(data)
        } catch (error) {
          console.error(error)
        } 
      }
      fetchApi();
    }
    }, [searchTerm]);
  
    return (
      <section>
        {data.length ===0? (<p className="not-found">No plants were found with this name. Is this plant also knowed by other names? You can try that!</p>
        ) : (
        <ul className="plant-list">
          {data.map((plant)=>(<li key={plant.id}>
            <PlantCard key={plant.id} plant={plant}/></li>))}
        </ul>
        )}
      </section>
    );
  }
  