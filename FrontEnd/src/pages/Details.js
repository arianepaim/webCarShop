import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import Navbar from "./../components/NavBar/index";
import "../styles/carDetailsPage.css";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

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
        <div className="car-details-card">
          <div className="car-details-carousel">
            <img
              src={imageUrls[currentImageIndex]}
              alt={`Car Image ${currentImageIndex}`}
              className="car-details-image"
            />
            <button
              className="carousel-button prev-button"
              onClick={handlePrevImage}
            >
              Prev
            </button>
            <button
              className="carousel-button next-button"
              onClick={handleNextImage}
            >
              Next
            </button>
          </div>
          <div className="car-details-content">
            <h2 className="car-details-title">
              {vehicle.brand} {vehicle.name} {vehicle.model}
            </h2>
            <p className="car-details-price">R$ {vehicle.price}</p>
            <p className="car-details-description">{vehicle.description}</p>
            {/* Exiba outros detalhes do veículo */}
          </div>
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
  );
};

export default CarDetailsPage;
