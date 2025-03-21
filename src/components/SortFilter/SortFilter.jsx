import styles from './SortFilter.module.css';

const SortFilter = ({ sortBy, filterType, filterText, setSortBy, setFilterType, setFilterText, isHomepage }) => {

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <section className={styles.sortFilterContainer}>
      <label className={styles.label}>Sort by:</label>
      <select className={styles.select} value={sortBy} onChange={handleSortChange}>
        <option value="none">None</option>
        <option value="alphabetical">Alphabetical</option>
        {!isHomepage && <option value="date">Creation Date</option>}
      </select>
      
      <label className={styles.label}>Filter by:</label>
      <select className={styles.select} value={filterType} onChange={handleFilterChange}>
        <option value="none">None</option>
        <option value="common-name">Common name</option>
        <option value="scientific-name">Scientific Name</option>
      </select>

      <input
        className={styles.input}
        type="text"
        placeholder="Filter plants..."
        value={filterText}
        onChange={handleFilterTextChange}
      />
    </section>
  );
};

export default SortFilter;
