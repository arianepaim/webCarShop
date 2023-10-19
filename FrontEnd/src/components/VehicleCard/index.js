import React from 'react';

const VehicleCard = ({ vehicle }) => {
  return (
    <div>
      <h2>{vehicle.name}</h2>
      <p>Valor: {vehicle.value}</p>
      {/* Renderize outras informações do veículo aqui */}
    </div>
  );
};

export default VehicleCard;
