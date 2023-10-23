package com.desenvolvimento.webCarShop.services;

import com.desenvolvimento.webCarShop.entities.User;
import com.desenvolvimento.webCarShop.entities.UserRoles;
import com.desenvolvimento.webCarShop.entities.exception.InvalidPasswordException;
import com.desenvolvimento.webCarShop.entities.exception.ResourceNotFoundException;
import com.desenvolvimento.webCarShop.repositories.UserRepository;
import com.desenvolvimento.webCarShop.security.JWTService;
import com.desenvolvimento.webCarShop.shared.UserDTO;
import com.desenvolvimento.webCarShop.view.model.LoginResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final String hederPrefix = "Bearer ";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public List<UserDTO> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> new ModelMapper().map(user, UserDTO.class)).collect(Collectors.toList());
    }

    public UserDTO findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário com o id " + id + " não encontrado."));
        return new ModelMapper().map(user, UserDTO.class);
    }

    public UserDTO findByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Email não encontrado."));
        return new ModelMapper().map(user, UserDTO.class);
    }

    public UserDTO insert(UserDTO userDto) {
        userDto.setId(null);

        User user = new ModelMapper().map(userDto, User.class);

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new InputMismatchException("Já existe usuário cadastrado com o email: " + user.getEmail());
        }

        if (validatePassword(user.getPassword())) {
            if (userDto.getRole() == null || userDto.getRole().equals(UserRoles.USER)) {
                user.setRole(UserRoles.USER);
            } else {
                user.setRole(user.getRole());
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user = userRepository.save(user);
            userDto.setId(user.getId());
        } else {
            throw new InvalidPasswordException("A senha não atende aos critérios de segurança.");
        }

        return userDto;
    }

    public void updatePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário com o ID " + userId + " não encontrado."));

        if (isPasswordValid(user, oldPassword)) {
            if (validatePassword(newPassword)) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
            } else {
                throw new InvalidPasswordException("A nova senha não atende aos critérios de segurança.");
            }
        } else {
            throw new InvalidPasswordException("Senha antiga incorreta.");
        }
    }

    private boolean isPasswordValid(User user, String password) {
        return passwordEncoder.matches(password, user.getPassword());
    }

    public boolean validatePassword(String newPassword) {
        return newPassword.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$");
    }

    public LoginResponse logInto(String email, String password) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password, Collections.emptyList()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = hederPrefix + jwtService.generateToken(authentication);

        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null) {
            return new LoginResponse(token, user);
        } else {
            throw new ResourceNotFoundException("Usuário não encontrado.");
        }
    }
}

