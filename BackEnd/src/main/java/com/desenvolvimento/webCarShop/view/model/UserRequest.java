package com.desenvolvimento.webCarShop.view.model;

import com.desenvolvimento.webCarShop.entities.UserRoles;
import lombok.Data;

@Data
public class UserRequest {

    private String name;
    private String email;
    private String password;
    private UserRoles role;
}
