

export default function SearchBar({searchInputRef, onSearch}) {
  
  return (
    <section className="add-plant-section">
    	<label htmlFor="plant-input" className="sr-only">Search your plant pal</label>
    	<input 
        type="text" 
        placeholder="Search your plant pal" 
        ref={searchInputRef}/>
    	<button onClick={onSearch}>Go</button>
    </section>
    ); 
} 