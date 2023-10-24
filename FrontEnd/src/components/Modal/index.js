import React, { useState } from 'react';
import api from '../../services/api';
import './styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ buttonName, modaTitle, vehicleData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageCar, setImageCar] = useState([]);
  const [carData, setCarData] = useState({
    name: vehicleData?.name || '',
    brand: vehicleData?.brand || '',
    model: vehicleData?.model || '',
    price: vehicleData?.price || '',
    year: vehicleData?.year || '',
    color: vehicleData?.color || '',
  });

  // Copie as imagens do veículo para o estado de imagens do Modal
  const [carImages, setCarImages] = useState(vehicleData?.image ? vehicleData.image.split(';') : []);

  const token = localStorage.getItem('token');  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showAlertAndRedirect = (message, redirectTo) => {
    alert(message);
    window.location.href = redirectTo;
  };

  const handleAddCar = async () => {
    try {
      const parsedCarData = {
        ...carData,
        price: parseFloat(carData.price),
        year: parseInt(carData.year),
      };

      if (carImages.length > 0) {
        parsedCarData.image = carImages.join(';');
      }

      if (vehicleData?.id) {
        const response = await api.put(`/vehicles/${vehicleData.id}`, parsedCarData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
        });

        showAlertAndRedirect('Carro atualizado com sucesso.', '/');
      } else {
        const response = await api.post('/vehicles', parsedCarData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
        });

        showAlertAndRedirect('Carro adicionado com sucesso.', '/');
      }
    } catch (error) {
      console.error('Erro ao adicionar/atualizar o carro:', error);
    }
  };

  // Função para remover uma imagem da lista de imagens
  const handleRemoveImage = (index) => {
    // Crie uma cópia da lista de imagens
    const updatedImages = [...carImages];
    // Remova a imagem na posição 'index'
    updatedImages.splice(index, 1);
    // Atualize o estado com a lista de imagens atualizada
    setCarImages(updatedImages);
  };

  return (
    <div>
      <div className='modal-btn-editar' onClick={() => {
        // Copie as imagens do veículo para o estado de imagens do Modal
        setCarImages(vehicleData?.image ? vehicleData.image.split(';') : []);
        setModalIsOpen(true);
      }}>{buttonName}</div>
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
            <button onClick={() => {
              setCarImages([...carImages, carData.image]);
              carData.image = '';
            }}>Adicionar Imagem</button>
            <div className='modal-container-add-cars'>
              {carImages.map((image, index) => (
                <div key={index} className='modal-image-container'>
                  <img className='modal-image-car' src={image} alt={`Image ${index}`} />
                  <span className='delete-button-image' onClick={() => handleRemoveImage(index)}><FontAwesomeIcon icon={faTrash}/></span>
                </div>
              ))}
            </div>
            <div className='modal-container-btn'>
              <button className='modal-btn-add' onClick={handleAddCar}>Adicionar/Editar</button>
              <button className='modal-btn-cancel' onClick={() => setModalIsOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
