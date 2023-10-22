import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const VehicleCard = ({ vehicle }) => {
  const imageUrls = vehicle.image.split(";");
  const firstImageUrl = imageUrls[0];

  return (
    <Link to={`/details?id=${vehicle.id}`} className="card">
      <img src={firstImageUrl} alt="Imagem do carro" />
      <div className="container">
        <p>{vehicle.brand} {vehicle.name} {vehicle.model}</p>
        <p>R$ {vehicle.price}</p>
      </div>
    </Link>
  );
};

export default VehicleCard;
