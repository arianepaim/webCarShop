import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ vehicles, setFilteredVehicles }) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const filteredVehicles = vehicles.filter(vehicle =>
      vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredVehicles(filteredVehicles);
  };

  return (
    <div className="container-search">
      <input 
        className="input-search" 
        type="text" 
        placeholder="Pesquisa" 
        value={search} 
        onChange={event => setSearch(event.target.value)}
      />
      <FontAwesomeIcon 
        icon={faSearch} 
        className="icon-search"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Search;
