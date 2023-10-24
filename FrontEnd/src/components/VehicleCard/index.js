import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const formatPrice = (price) => {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const VehicleCard = ({ vehicle }) => {
  const imageUrls = vehicle.image.split(";");
  const firstImageUrl = imageUrls[0];

  return (
    <Link to={`/details?id=${vehicle.id}`} className="card">
      <img src={firstImageUrl} alt="Imagem do carro" />
      <div className="container">
        <div className="info">
          <p className="name">
            {vehicle.brand} {vehicle.name} {vehicle.model}
          </p>
          <p className="year">{vehicle.year}</p>
        </div>
        <div className="price">
          <p className="price-value">{formatPrice(vehicle.price)}</p>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;
