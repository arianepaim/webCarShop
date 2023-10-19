import React, { useEffect, useState } from 'react';
import api from '../services/api';
import VehicleCard from '../components/VehicleCard';
import NavigationBar from '../components/NavBar';

const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await api.get('/vehicles');
      const orderedVehicles = response.data.sort((a, b) => a.value - b.value);
      setVehicles(orderedVehicles);
    };
    fetchVehicles();
  }, []);

  return (
    <div>
        <NavigationBar />
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default HomePage;
