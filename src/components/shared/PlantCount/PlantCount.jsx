import styles from './PlantCount.module.css';

const PlantCount = ({isLoading, plants}) => {
  return (
   <>
{!isLoading && 
  (<section className={styles.plantCountContainer}>
    {plants.length > 0 ? (
      plants.length===1 ? (
      <p className={styles.plantCount}>You have <strong>1 plant</strong> in your collection.</p>
    ) : (
    <p className={styles.plantCount}>
      You have <strong>{plants.length} plants</strong> in your collection.</p> )
    ) : ( 
    <p className={styles.plantCount}>You haven't added any plants yet.</p>)}
  </section>
  )}
  </>
  )
}

export default PlantCount

