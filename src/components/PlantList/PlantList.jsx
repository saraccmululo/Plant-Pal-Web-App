import PlantCard from '../PlantCard/PlantCard';
import styles from './PlantList.module.css';

const PlantList = ({searchTerm, filteredPlants, isLoading, onDelete, isDashboard }) => {
  return (
    <section className={styles.listContainer}>
      {isLoading ? (
        <section>
          <p className={styles.loadingSpinner}></p>
        </section>
      ) : filteredPlants.length === 0 ? (
        <p className={styles.notFound}>
          {searchTerm
           ? "No plants found. Try another plant name!"
           : "No plants match your filter or sort criteria."}
           </p>
      ) : (
        <ul className={styles.plantList}>
          {filteredPlants.map((plant) => (
            <li className={styles.listItem} key={plant.id}>
              <PlantCard 
              plant={plant} 
              onDelete={onDelete} 
              isDashboard={isDashboard} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PlantList;
