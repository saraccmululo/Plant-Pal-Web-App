
const SearchBar = ({searchInputRef, onSearch}) => {
  
  return (
    <>
    <h3>Find the care guide for your plants by entering their names below:</h3>
    <section className="add-plant-section">
    	<label htmlFor="plant-input" className="sr-only">Search your plant pal</label>
    	<input 
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