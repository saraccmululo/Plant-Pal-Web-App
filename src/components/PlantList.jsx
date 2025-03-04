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
          const response = await fetch(`https://perenual.com/api/v2/species-list?key=${API_KEY}&q=${searchTerm}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const json = await response.json();
          
          console.log (json)

          const plantCardData=json.data
          .filter((plant)=>plant.id <3000)
          .map((plant) => ({
            id: plant.id ,
            common_name: plant.common_name,
            scientific_name: plant.scientific_name.join(', '),
            thumbnail: plant.default_image?.thumbnail||logo,
          }));
      
          setData(plantCardData)

        } catch (error) {
          console.error(error)
        } 
      }
      fetchApi();
    }
    }, [searchTerm]);
  
    const handleDelete=(id) =>{
      setData(prevData =>prevData.filter(plant=>plant.id !==id));
    };

    return (
      <section>
        {searchTerm&&data.length ===0? (<p className="not-found">Please, try another plant name.</p>
        ) : (
        <ul className="plant-list">
          {data.map((plant)=>(<li key={plant.id}>
            <PlantCard key={plant.id} plant={plant} onDelete={handleDelete}/></li>))}
        </ul>
        )}
      </section>
    );
  }
  