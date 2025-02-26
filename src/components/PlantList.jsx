import { useState, useEffect } from 'react';

export default function PlantList() {
    const [data, setData] = useState(null);
    
    const API_KEY = import.meta.env.VITE_API_KEY; 
    const API_URL = `https://perenual.com/api/v2/species-list?key=${API_KEY}`;


    useEffect(() => {
      async function fetchApi() {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const json = await response.json();
          setData(json);
        } catch (error) {
          console.error(error)
        } 
      }
  
      fetchApi();
  
    }, [])
  
    return (
      <section>
        <header>
          <h2>Plant List</h2>
        </header>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
    );
  }
  