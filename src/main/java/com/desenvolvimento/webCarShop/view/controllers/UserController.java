package com.desenvolvimento.webCarShop.view.controllers;

import com.desenvolvimento.webCarShop.services.UserService;
import com.desenvolvimento.webCarShop.shared.UserDTO;
import com.desenvolvimento.webCarShop.view.model.LoginRequest;
import com.desenvolvimento.webCarShop.view.model.LoginResponse;
import com.desenvolvimento.webCarShop.view.model.UserRequest;
import com.desenvolvimento.webCarShop.view.model.UserResponse;
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
    public ResponseEntity<UserResponse> insert(@RequestBody UserRequest request) {
        UserDTO userDTO = new ModelMapper().map(request, UserDTO.class);
        userDTO = service.insert(userDTO);
        UserResponse response = new ModelMapper().map(userDTO, UserResponse.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return service.logInto(request.getEmail(), request.getPassword());
    }

}


