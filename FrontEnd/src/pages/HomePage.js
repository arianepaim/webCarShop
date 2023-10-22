import React, { useEffect, useState } from "react";
import api from "../services/api";
import VehicleCard from "../components/VehicleCard/index";
import NavBar from "../components/NavBar/index";
import Search from "../components/Search";
import "../styles/homePage.css";
import FilterButton from "../components/FilterButton";

const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);

    const filteredVehicles = vehicles.filter((vehicle) => {
      if (newFilters.vehicleType === "") {
        return true; // Retorna todos os veículos se nenhuma marca for selecionada
      } else {
        return vehicle.brand === newFilters.vehicleType;
      }
    });

    setFilteredVehicles(filteredVehicles);
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await api.get("/vehicles");
      const vehiclesResponse = response.data;
      setVehicles(vehiclesResponse);
      setFilteredVehicles(vehiclesResponse);
    };
    fetchVehicles();
  }, []);

  return (
    <div className="container-home">
      <NavBar />
      <Search vehicles={vehicles} setFilteredVehicles={setFilteredVehicles} />
      <div className="container-filter">
        <FilterButton onFiltersChange={handleFiltersChange} />
        <div className="container-cards">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
