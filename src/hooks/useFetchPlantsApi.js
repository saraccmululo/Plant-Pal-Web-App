import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY; 


const useFetchPlantsApi = (searchTerm) =>{
  const [plantsData, setPlantsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
  if(!searchTerm) return;

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
          thumbnail: plant.default_image?.thumbnail|| import.meta.env.BASE_URL + "logoNew.png",
        }));

        console.log("Filtered plants count:", plantCardData.length); 

        setPlantsData(plantCardData)

      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchApi();
  }, [searchTerm]);

  return { plantsData, isLoading };
};

export default useFetchPlantsApi;