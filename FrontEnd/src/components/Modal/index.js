import React, { useState } from 'react';
import api from '../../services/api';
import './styles.css';

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

  const token = localStorage.getItem('token');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showAlertAndRedirect = (message, redirectTo) => {
    alert(message); // Exibe o alerta com a mensagem de sucesso
    window.location.href = redirectTo; // Redireciona para a página inicial (ou outra página desejada)
  };

  const handleAddCar = async () => {
    try {
      const parsedCarData = {
        ...carData,
        price: parseFloat(carData.price.replace('R$ ', '').replace(',', '.')),
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

        showAlertAndRedirect('Carro atualizado com sucesso.', '/'); // Exibe alerta e redireciona para a página inicial
      } else {
        // Realizar uma requisição POST para adicionar um novo veículo
        const response = await api.post('/vehicles', parsedCarData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
        });

        showAlertAndRedirect('Carro adicionado com sucesso.', '/'); // Exibe alerta e redireciona para a página inicial
      }
    } catch (error) {
      console.error('Erro ao adicionar/atualizar o carro:', error);
    }
  };

  return (
    <div>
      <div onClick={() => setModalIsOpen(true)}>{buttonName}</div>
      {modalIsOpen && (
        <div className="container-modal">
          <div className="modal-content">
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
            <div className='modal-ipt-number'>
            <input
            className='modal-ipt-price'
              type="number"
              name="price"
              placeholder="Preço"
              value={carData.price}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="year"
              placeholder="Ano"
              value={carData.year}
              onChange={handleInputChange}
            />
            </div>
            <input
              type="text"
              name="color"
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
            <div className='modal-container-btn'>
            <button className='modal-btn-add' onClick={handleAddCar}>Adicionar</button>
            <button className='modal-btn-cancel' onClick={() => setModalIsOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}      
    </div>
  );
};

export default Modal;
