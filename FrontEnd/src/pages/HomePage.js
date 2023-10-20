import React, { useEffect, useState } from "react";
import api from "../services/api";
import VehicleCard from "../components/VehicleCard/index";
import NavBar from "../components/NavBar/index";
import Search from "../components/Search";
import "../styles/homePage.css";

const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

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
      <div className="container-cards">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
