import React, { useState } from 'react';
import '../styles/carSalePage.css';

function CarSalePage() {
    const [carData, setCarData] = useState({
        name: '',
        brand: '',
        model: '',
        price: '',
        year: '',
        color: '',
        image: '',
        observations: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCarData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="container-modal-car">
            <div className="modal-content-car">
                <h2 className='car-h2'>Formulário de Venda de Carros</h2>
                <form onSubmit={handleSubmit}>
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
                    <div className="modal-ipt-number">
                        <input
                            className="modal-ipt-price"
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
                    <textarea
                        name="observations"
                        placeholder="Observações"
                        value={carData.observations}
                        onChange={handleInputChange}
                    ></textarea>
                    <div className="modal-container-btn-car">
                        <button className="modal-btn-submit-car" type="submit">Enviar</button>
                        <button className="modal-btn-cancel-car" type='submit'><a href='/'>Cancelar </a></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CarSalePage;
