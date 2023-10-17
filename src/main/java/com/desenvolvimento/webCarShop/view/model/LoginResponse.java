package com.desenvolvimento.webCarShop.view.model;

import com.desenvolvimento.webCarShop.shared.UserDTO;
import lombok.Data;

@Data
public class LoginResponse {

    private String token;
    private UserDTO userDTO;
}
