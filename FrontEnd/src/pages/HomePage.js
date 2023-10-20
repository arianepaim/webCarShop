import React, { useEffect, useState } from "react";
import api from "../services/api";
import VehicleCard from "../components/VehicleCard/index";
import NavBar from "../components/NavBar/index";
import Search from "../components/Search";
import "../styles/homePage.css";

const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await api.get("/vehicles");
      const orderedVehicles = response.data.sort((a, b) => a.value - b.value);
      setVehicles(orderedVehicles);
    };
    fetchVehicles();
  }, []);

  return (
    <div className="container-home">
      <NavBar />
      <Search />
      <div className="container-cards">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
