import { useMemo } from 'react';

const useSortedAndFilteredPlants = (plants, filterType, filterText, sortBy) => {
  return useMemo (() => {
    return plants
    .filter((plant) => {
      if (filterType === "none" || filterText === "") return true;
      const searchField = filterType === "common-name" ? plant.common_name : plant.scientific_name;
      return searchField.toLowerCase().includes(filterText.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.common_name.localeCompare(b.common_name);
      } else if (sortBy === "date") {
        const dateA = a.date_created?.toDate() || new Date(0);
        const dateB = b.date_created?.toDate() || new Date(0);
        return dateB - dateA;
      }
      return 0;
    });
  }, [plants, filterType, filterText, sortBy]);
}

export default useSortedAndFilteredPlants;