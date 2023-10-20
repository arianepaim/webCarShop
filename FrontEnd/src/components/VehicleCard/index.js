import React from "react";
import "./styles.css";
const VehicleCard = ({ vehicle }) => {
  return (
    <div className="card">
      <img src={vehicle.image} alt="Imagem do carro" />
      <div className="container">
        <p>{vehicle.brand} {vehicle.name} {vehicle.model}</p>
        <p>R$ {vehicle.price}</p>
      </div>
    </div>
  );
};

export default VehicleCard;
