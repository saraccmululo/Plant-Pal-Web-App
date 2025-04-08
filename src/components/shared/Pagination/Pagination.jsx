import { useState, useEffect } from 'react';
import PlantList from '../../PlantList/PlantList';
import styles from './Pagination.module.css';

const Pagination = ({ filteredPlants, searchTerm, filterType, filterText, onDelete, isLoading, isDashboard }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  
  useEffect(() => {
    setCurrentPage(1); 
    }, [searchTerm, filterType, filterText]);

  const indexOfLastPlant = currentPage * itemsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - itemsPerPage;
  const currentPlants = filteredPlants.slice(indexOfFirstPlant, indexOfLastPlant);

  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
 const pageButtons=[];
 for (let i=0; i<totalPages; i++) {
  pageButtons.push(
    <button key={i + 1} 
    onClick={() => handlePageChange(i + 1)}
    className={styles.pageButton}
    > {i + 1}
    </button>)
 }

  return (
    <>
    <section>
      {/* Pass the currentPlants to PlantList */}
      <PlantList
        filteredPlants={currentPlants} 
        searchTerm={searchTerm} 
        isLoading={isLoading} 
        onDelete={onDelete} 
        isDashboard={isDashboard}
      />
    </section>
    {/* Pagination buttons */}
      {filteredPlants.length > 0 && (
      <section className={styles.pageButtonContainer}>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Previous
        </button>
        
        {pageButtons}
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Next
        </button>
      </section>
        )}
    </>
  );
};

export default Pagination;
