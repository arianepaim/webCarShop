import React from "react";
import "./styles.css";

const VehicleCard = ({ vehicle }) => {
  const imageUrls = vehicle.image.split(";");
  const firstImageUrl = imageUrls[0];

  return (
    <div className="card">
      <img src={firstImageUrl} alt="Imagem do carro" />
      <div className="container">
        <p>{vehicle.brand} {vehicle.name} {vehicle.model}</p>
        <p>R$ {vehicle.price}</p>
      </div>
    </div>
  );
};

export default VehicleCard;
