import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import Navbar from "./../components/NavBar/index";
import "../styles/carDetailsPage.css";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CarDetailsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vehicleId = searchParams.get("id");
  const [vehicle, setVehicle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editVehicleData, setEditVehicleData] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      const response = await api.get(`/vehicles/${vehicleId}`);
      const vehicleData = response.data;
      setVehicle(vehicleData);
      setEditVehicleData(vehicleData);
    };
    fetchVehicle();
  }, [vehicleId]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  const imageUrls = vehicle.image.split(";");

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/vehicles/${vehicleId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const handleEdit = () => {
    setEditModalIsOpen(true);
    setEditVehicleData(vehicle);
  };

  return (
    <div>
      <Navbar />
      <div className="car-details-container">
      <div className="car-details-carousel">
          <img
            src={imageUrls[currentImageIndex]}
            alt={`Car Image ${currentImageIndex}`}
            className="car-details-image"
          />
          <button
            className="carousel-button-prev-button"
            onClick={handlePrevImage}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> {/* Ícone de seta esquerda */}
          </button>
          <button
            className="carousel-button-next-button"
            onClick={handleNextImage}
          >
            <FontAwesomeIcon icon={faChevronRight} /> {/* Ícone de seta direita */}
          </button>
          <div className="mini-image-thumbnails">
            {imageUrls.map((imageUrl, index) => (
              <div
                key={index}
                className={`mini-image-thumbnail ${
                  index === currentImageIndex ? "active" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={imageUrl} alt={`Car Image ${index}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="car-details-card">
          <div className="car-details-content">
            <h2 className="car-details-title">
              {vehicle.brand} {vehicle.name} {vehicle.model}
            </h2>
            <p className="car-details-price">R$ {vehicle.price}</p>
            <p className="car-details-description">{vehicle.description}</p>
            {/* Exiba outros detalhes do veículo */}
          </div>
                <div className="details-container-btn">
          <Modal
            buttonName="Editar"
            modaTitle="Editar Carro"
            isOpen={editModalIsOpen}
            onRequestClose={() => setEditModalIsOpen(false)}
            vehicleData={editVehicleData}
          />
          <button className="delete-button" onClick={handleDelete}>
            Excluir
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
