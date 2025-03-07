
const SearchBar = ({searchInputRef, onSearch}) => {
  
  return (
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
    ); 
} 
export default SearchBar;