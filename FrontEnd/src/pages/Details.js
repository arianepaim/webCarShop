import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import Navbar from "./../components/NavBar/index";
import "../styles/carDetailsPage.css";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./../components/Footer/index";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const formatPrice = (price) => {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

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
  const [showItem, setShowItem] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (role === "ADMIN") {
      setShowItem(true);
    }
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
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir o veículo?"
    );
    if (confirmDelete) {
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
    }
  };

  const handleEdit = () => {
    setEditModalIsOpen(true);

    // Copie as imagens do veículo para o estado do modal de edição
    setEditVehicleData({ ...vehicle, images: vehicle.image.split(";") });
  };

  return (
    <div>
      <Navbar />
      <div className="car-details-container">
        <div className="car-details-carousel">
          <img
            src={imageUrls[currentImageIndex]}
            alt={`Foto carro ${currentImageIndex}`}
            className="car-details-image"
          />
          <button
            className="carousel-button-prev-button"
            onClick={handlePrevImage}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="carousel-button-next-button"
            onClick={handleNextImage}
          >
            <FontAwesomeIcon icon={faChevronRight} />
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
                <img src={imageUrl} alt={`Foto carro ${index}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="car-details-card">
          <div className="car-details-content">
            <h2 className="car-details-title">
              {vehicle.brand} {vehicle.name} {vehicle.model}
            </h2>
            <div className="car-details-info">
              <p className="price">{formatPrice(vehicle.price)}</p>
              <hr />
              <p>Ano: {vehicle.year}</p>
              <hr />
              <p>Cor: {vehicle.color}</p>
            </div>
          </div>
          <div className="details-container-btn">
            {showItem ? (
              <button className="details-btn-edit" onClick={handleEdit}>
                <Modal
                  buttonName="Editar"
                  modaTitle="Editar Carro"
                  isOpen={editModalIsOpen}
                  onRequestClose={() => setEditModalIsOpen(false)}
                  vehicleData={editVehicleData}
                />
              </button>
            ) : null}
            {showItem ? (
              <button className="details-btn-delete" onClick={handleDelete}>
                Excluir
              </button>
            ) : null}
            {!showItem ? (
              <a href="/">
                <button className="details-btn-edit">Tenho interesse</button>
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarDetailsPage;
