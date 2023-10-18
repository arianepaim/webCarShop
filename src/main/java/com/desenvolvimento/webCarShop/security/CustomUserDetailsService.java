package com.desenvolvimento.webCarShop.security;

import com.desenvolvimento.webCarShop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) {
        return (UserDetails) userService.findByEmail(email);
    }


    public UserDetails loadUserById(Long id) {
        return (UserDetails) userService.findById(id);
    }


//    private User getUser(Supplier<Optional<User>> supplier) {
//        return supplier.get().orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado."));
//    }
}


