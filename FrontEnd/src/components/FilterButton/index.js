import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./styles.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const FilterButton = ({ onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [brands, setBrands] = useState([]);
  const [age, setAges] = useState([]);
  const [price, setPrice] = useState([]);
  const [color, setColor] = useState([]);

  const handleToggle = (evt) => {
    evt.stopPropagation();
    setIsOpen(!isOpen);

    if (!isOpen) {
      fetchBrands();
    }
  };

  const handleApplyFilters = (marca) => {
    // Lógica para obter os filtros selecionados
    const selectedFilters = {
      // Exemplo de filtro: tipo de veículo
      vehicleType: marca,
      // Outros filtros...
    };

    // Chama a função de callback com os filtros selecionados
    onFiltersChange(selectedFilters);
  };

  const handleBrandSelect = () => {
    setSelectedBrand(!selectedBrand);
  };
  const handleAgeSelect = () => {
    setSelectedAge(!selectedAge);
  };
  const handlePriceSelect = () => {
    setSelectedPrice(!selectedPrice);
  };
  const handleColorSelect = () => {
    setSelectedColor(!selectedColor);
  };

  const fetchBrands = async () => {
    try {
      const response = await api.get("/vehicles");
      const vehiclesResponse = response.data;
      const uniqueBrands = [
        ...new Set(vehiclesResponse.map((vehicle) => vehicle.brand)),
      ];
      setBrands(uniqueBrands);

      const uniqueAges = [
        ...new Set(vehiclesResponse.map((vehicle) => vehicle.ano)),
      ];
      setAges(uniqueAges);

      const uniquePrice = [
        ...new Set(vehiclesResponse.map((vehicle) => vehicle.price)),
      ];
      setPrice(uniquePrice);
      const uniqueColor = [
        ...new Set(vehiclesResponse.map((vehicle) => vehicle.cor)),
      ];
      setColor(uniqueColor);
    } catch (error) {
      console.error("Erro ao buscar as marcas:", error);
    }
  };

  return (
    <div className="dropdown-filter">
      <div className="btn-filter" onClick={handleToggle}>
        {isOpen ? "Ocultar Filtro" : "Selecionar Filtro"}
      </div>
      {isOpen && (
        <ul className="menu-filter">
          <li className="li-filter" onClick={handleBrandSelect}>
            {selectedBrand ? (
              <React.Fragment>
                Marca <FaArrowUp />
              </React.Fragment>
            ) : (
              <React.Fragment>
                Marca <FaArrowDown />
              </React.Fragment>
            )}
          </li>
          {selectedBrand && (
            <ul>
              <li>
                <select
                  className="ipt-filter"
                  onChange={(event) => handleApplyFilters(event.target.value)}
                >
                  <option value="">Selecione uma marca</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          )}
          <li className="li-filter" onClick={handleAgeSelect}>
            {selectedAge ? (
              <React.Fragment>
                Ano <FaArrowUp />
              </React.Fragment>
            ) : (
              <React.Fragment>
                Ano <FaArrowDown />
              </React.Fragment>
            )}
          </li>
          {selectedAge && (
            <ul>
              <li>
                <select
                  className="ipt-filter"
                  onChange={(event) => handleApplyFilters(event.target.value)}
                >
                  <option value="">Selecione uma marca</option>
                  {age.map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          )}
          <li className="li-filter" onClick={handlePriceSelect}>
            {selectedPrice ? (
              <React.Fragment>
                Preço <FaArrowUp />
              </React.Fragment>
            ) : (
              <React.Fragment>
                Preço <FaArrowDown />
              </React.Fragment>
            )}
          </li>
          {selectedPrice && (
            <ul>
              <li>
                <select
                  className="ipt-filter"
                  onChange={(event) => handleApplyFilters(event.target.value)}
                >
                  <option value="">Selecione uma marca</option>
                  {price.map((price) => (
                    <option key={price} value={price}>
                      {price}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          )}          
          <li className="li-filter" onClick={handleColorSelect}>
            {selectedColor ? (
              <React.Fragment>
                Cor <FaArrowUp />
              </React.Fragment>
            ) : (
              <React.Fragment>
                Cor <FaArrowDown />
              </React.Fragment>
            )}
          </li>
          {selectedColor && (
            <ul>
              <li>
                <select
                  className="ipt-filter"
                  onChange={(event) => handleApplyFilters(event.target.value)}
                >
                  <option value="">Selecione uma cor</option>
                  {color.map((cor) => (
                    <option key={cor} value={cor}>
                      {cor}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          )}
        </ul>
      )}
    </div>
  );
};

export default FilterButton;
