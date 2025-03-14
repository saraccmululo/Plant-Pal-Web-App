const [currentPage, setCurrentPage] = useState(1);
const plantsPerPage = 10;

// Calculate the plants to show on the current page
const indexOfLastPlant = currentPage * plantsPerPage;
const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
const currentPlants = plants.slice(indexOfFirstPlant, indexOfLastPlant);

const nextPage = () => {
  setCurrentPage(prevPage => prevPage + 1);
};

const prevPage = () => {
  setCurrentPage(prevPage => prevPage - 1);
};

// Inside your component
<PlantList plants={currentPlants} />
