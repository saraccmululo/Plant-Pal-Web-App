import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase.js';

const useFetchPlantsDb = () => {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPlantsDb = async () => {
      if (!auth.currentUser) {
        setIsLoading(false);
        return;
      }

      try {
        const plantRef = collection(db, "plants", auth.currentUser.uid, "userPlants");
        const plantQuery = query(plantRef, orderBy("date_created", "desc"));
        const querySnapshot = await getDocs(plantQuery);

        const fetchedPlants = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPlants(fetchedPlants);
      } catch (error) {
        console.error("Error fetching plants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlantsDb();
  }, [auth.currentUser]); 

  return { plants, setPlants, isLoading };
};

export default useFetchPlantsDb;
