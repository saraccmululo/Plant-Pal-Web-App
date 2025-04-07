import { useState, useEffect } from 'react';
import PlantList from '../../PlantList/PlantList';
import styles from './Pagination.module.css';

const Pagination = ({ filteredPlants, searchTerm, filterType, filterText, onDelete, isLoading, isDashboard }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  console.log(filteredPlants)
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search/filter changes
    }, [searchTerm, filterType, filterText]);

  // Calculate the plants to be displayed on the current page
  const indexOfLastPlant = currentPage * itemsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - itemsPerPage;
  const currentPlants = filteredPlants.slice(indexOfFirstPlant, indexOfLastPlant);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
  console.log(totalPages)

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
 
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
    {/* Pagination controls */}
      {filteredPlants.length > 0 && (
      <section className={styles.pageButtonContainer}>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => handlePageChange(index + 1)}
            className={styles.pageButton}
          >
            {index + 1}
          </button>
        ))}
        
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
