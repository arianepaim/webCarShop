package com.desenvolvimento.webCarShop.view.controllers;

import com.desenvolvimento.webCarShop.entities.exception.InvalidPasswordException;
import com.desenvolvimento.webCarShop.entities.exception.ResourceNotFoundException;
import com.desenvolvimento.webCarShop.services.UserService;
import com.desenvolvimento.webCarShop.shared.UserDTO;
import com.desenvolvimento.webCarShop.view.model.*;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public ResponseEntity<List<UserResponse>> findAll() {
        List<UserDTO> list = service.findAll();
        List<UserResponse> responses = list
                .stream()
                .map(userDTO -> new ModelMapper().map(userDTO, UserResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable Long id) {
        UserDTO userDTO = service.findById(id);
        UserResponse response = new ModelMapper().map(userDTO, UserResponse.class);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<UserResponse> insert(@Valid @RequestBody UserRequest request) {
        UserDTO userDTO = new ModelMapper().map(request, UserDTO.class);
        userDTO = service.insert(userDTO);
        UserResponse response = new ModelMapper().map(userDTO, UserResponse.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/{id}/update-password")
    public ResponseEntity<String> updatePassword(@PathVariable Long id, @Valid @RequestBody UpdatePasswordRequest request) {
        try {
            service.updatePassword(id, request.getOldPassword(), request.getNewPassword());
            return ResponseEntity.ok("Senha atualizada com sucesso");
        } catch (InvalidPasswordException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return service.logInto(request.getEmail(), request.getPassword());
    }

}


