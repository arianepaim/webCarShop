package com.desenvolvimento.webCarShop.services;

import com.desenvolvimento.webCarShop.entities.Vehicle;
import com.desenvolvimento.webCarShop.entities.exception.ResourceNotFoundException;
import com.desenvolvimento.webCarShop.repositories.VehicleRepository;
import com.desenvolvimento.webCarShop.shared.VehicleDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public List<VehicleDTO> findAll() {
        List<Vehicle> list = vehicleRepository.findAllByOrderByPriceAsc();
        return list.stream().map(vehicle -> new ModelMapper().map(vehicle, VehicleDTO.class)).collect(Collectors.toList());
    }

    public VehicleDTO findById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Veículo com o id " + id + " não encontrado."));
        return new ModelMapper().map(vehicle, VehicleDTO.class);
    }

    public VehicleDTO insert(VehicleDTO dto) {
        dto.setId(null);

        Vehicle vehicle = new ModelMapper().map(dto, Vehicle.class);
        vehicle = vehicleRepository.save(vehicle);
        dto.setId(vehicle.getId());

        return dto;
    }

    public VehicleDTO update(Long id, VehicleDTO dto) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Veículo não encontrado.");
        }
        dto.setId(id);

        Vehicle vehicle = new ModelMapper().map(dto, Vehicle.class);
        vehicle = vehicleRepository.save(vehicle);

        return dto;
    }

    public boolean delete(Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
        } else {
            return false;
        }
        return true;
    }
}
