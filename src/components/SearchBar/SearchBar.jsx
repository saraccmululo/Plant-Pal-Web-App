import styles from './SearchBar.module.css';

const SearchBar = ({searchInputRef, onSearch}) => {
  
  return (
    <>
    <h3>Find the care guide for your plants:</h3>
    <section className={styles.addPlantSection}>
    	<label htmlFor="plant-input" className={styles.srOnly}>Search your plant pal</label>
    	<input 
        className={styles.searchInput}
        id="plant-input"
        type="text" 
        placeholder="Search your plant pal" 
        ref={searchInputRef}
        onKeyDown={(e)=>{if(e.key==='Enter'){onSearch();}}}
        />
    	<button onClick={onSearch}>Go</button>
    </section>
    </>
    ); 
} 
export default SearchBar;