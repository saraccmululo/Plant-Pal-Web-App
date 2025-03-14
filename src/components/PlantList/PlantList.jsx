import logo from '../../assets/logoNew.png';
import { useState, useEffect } from 'react';
import PlantCard from '../PlantCard/PlantCard';
import styles from './PlantList.module.css';

const PlantList = ({searchTerm}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const API_KEY = import.meta.env.VITE_API_KEY; 

    useEffect(() => {
    if(searchTerm) {
      const fetchApi = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://perenual.com/api/v2/species-list?key=${API_KEY}&q=${searchTerm}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const json = await response.json();
          
          console.log (json)

          const plantCardData=json.data
          .filter((plant)=>plant.id <=3000)
          .map((plant) => ({
            id: plant.id ,
            common_name: plant.common_name,
            scientific_name: plant.scientific_name.join(', '),
            thumbnail: plant.default_image?.thumbnail||logo,
          }));
          setData(plantCardData)

        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false);
        }
      }
      fetchApi();
    }
    }, [searchTerm]);
  
    const handleDelete=(id) =>{
      setData(prevData =>prevData.filter(plant=>plant.id !==id));
    };
       
    return (
      <section className={styles.listContainer}>
        {isLoading? (
        <section>
          <p className={styles.loadingSpinner}></p>
          </section>
        ) : searchTerm && data.length === 0 ? (
        <p className={styles.notFound}>No plants found. Try another plant name!</p>
        ) : (
        <ul className={styles.plantList}>
          {data.map((plant)=>(<li key={plant.id}>
            <PlantCard key={plant.id} plant={plant} onDelete={handleDelete}/></li>))}
        </ul>
        )}
      </section>
    );
  }
  
  export default PlantList;