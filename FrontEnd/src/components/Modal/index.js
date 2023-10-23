import React, { useState } from 'react';
import ReactModal from 'react-modal';
import api from '../../services/api';

const Modal = ({ buttonName, modaTitle, vehicleData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [carData, setCarData] = useState({
    name: vehicleData?.name || '',
    brand: vehicleData?.brand || '',
    model: vehicleData?.model || '',
    price: vehicleData?.price || 0,
    image: vehicleData?.image || '',
    year: vehicleData?.year || 0,
    color: vehicleData?.color || '',
  });
  
  
console.log('data', vehicleData)
  const token = localStorage.getItem('token');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCar = async () => {
    try {
      const parsedCarData = {
        ...carData,
        price: parseInt(carData.price),
        year: parseInt(carData.year),
      };
  
      if (vehicleData?.id) {
        // Realizar uma requisição PUT para atualizar os dados
        const response = await api.put(`/vehicles/${vehicleData.id}`, parsedCarData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
        });
  
        console.log('Car updated successfully:', response.data);
      } else {
        // Realizar uma requisição POST para adicionar um novo veículo
        const response = await api.post('/vehicles', parsedCarData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
        });
  
        console.log('Car added successfully:', response.data);
      }
  
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error adding/updating car:', error);
    }
  };
  

  return (
    <div>
      <div onClick={() => setModalIsOpen(true)}>{buttonName}</div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {/* Conteúdo do modal */}
        <h2>{modaTitle}</h2>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={carData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="brand"
          placeholder="Marca"
          value={carData.brand}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Modelo"
          value={carData.model}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={carData.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="ano"
          placeholder="Ano"
          value={carData.year}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cor"
          placeholder="Cor"
          value={carData.color}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={carData.image}
          onChange={handleInputChange}
        />
        <button onClick={handleAddCar}>Adicionar</button>
        <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
      </ReactModal>
    </div>
  );
};

export default Modal;
