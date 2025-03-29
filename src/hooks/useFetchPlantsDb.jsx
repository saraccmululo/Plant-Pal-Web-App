import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
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
        const querySnapshot = await getDocs(plantRef);

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
  }, [auth.currentUser]); // Include auth.currentUser as a dependency

  return { plants, setPlants, isLoading };
};

export default useFetchPlantsDb;
