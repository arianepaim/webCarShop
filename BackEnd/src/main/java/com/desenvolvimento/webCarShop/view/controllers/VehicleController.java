package com.desenvolvimento.webCarShop.view.controllers;

import com.desenvolvimento.webCarShop.entities.exception.ResourceNotFoundException;
import com.desenvolvimento.webCarShop.services.VehicleService;
import com.desenvolvimento.webCarShop.shared.UserDTO;
import com.desenvolvimento.webCarShop.shared.VehicleDTO;
import com.desenvolvimento.webCarShop.view.model.UserRequest;
import com.desenvolvimento.webCarShop.view.model.UserResponse;
import com.desenvolvimento.webCarShop.view.model.vehicle.VehicleRequest;
import com.desenvolvimento.webCarShop.view.model.vehicle.VehicleResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService service;

    @GetMapping
    public ResponseEntity<List<VehicleResponse>> findAll() {
        List<VehicleDTO> list = service.findAll();
        List<VehicleResponse> responses = list
                .stream()
                .map(vehicleDTO -> new ModelMapper().map(vehicleDTO, VehicleResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponse> findById(@PathVariable Long id) {
        VehicleDTO vehicleDTO = service.findById(id);
        VehicleResponse response = new ModelMapper().map(vehicleDTO, VehicleResponse.class);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<VehicleResponse> insert(@RequestBody VehicleRequest request) {
        VehicleDTO vehicleDTO = new ModelMapper().map(request, VehicleDTO.class);
        vehicleDTO = service.insert(vehicleDTO);
        VehicleResponse response = new ModelMapper().map(vehicleDTO, VehicleResponse.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehicleResponse> update(@PathVariable Long id, @RequestBody VehicleRequest request) {
        VehicleDTO vehicleDTO = new ModelMapper().map(request, VehicleDTO.class);
        vehicleDTO = service.update(id, vehicleDTO);
        VehicleResponse response = new ModelMapper().map(vehicleDTO, VehicleResponse.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        boolean deleted = service.delete(id);
        if (deleted) {
            return ResponseEntity.ok("Veículo deletado com sucesso.");
        } else {
            throw new ResourceNotFoundException("Veículo com o id: " + id + " não encontrado.");
        }
    }

}
