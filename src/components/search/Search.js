import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApioptions } from "../../api/api";

const Search = ({ onSearchChange }) => {
  const [Search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApioptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          return {
            options: response.data.map((city) => ({
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            })),
          };
        } else {
          return {
            options: [],
          };
        }
        
      })
      .catch((err) => console.error(err));
  };

  const handleonChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={Search}
      onChange={handleonChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
