import styles from './SearchBar.module.css';

const SearchBar = ({searchInputRef, onSearch}) => {
  
  return (
    <section className={styles.searchSection}>
      <h3 className={styles.searchH3}>Find the care guide for your plants:</h3>
      <section className={styles.searchBar}>
    	  <label htmlFor="plant-input" className={styles.srOnly}>Search your plant pal</label>
    	  <input 
          className={styles.searchInput}
          id="plant-input"
          type="text" 
          placeholder="Search your plant pal" 
          ref={searchInputRef}
          onKeyDown={(e)=>{if(e.key==='Enter'){onSearch();}}}
        />
    	<button className={styles.goButton} onClick={onSearch}>Go</button>
      </section>
    </section>
    ); 
} 
export default SearchBar;