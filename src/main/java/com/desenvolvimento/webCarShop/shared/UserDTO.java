package com.desenvolvimento.webCarShop.shared;

import com.desenvolvimento.webCarShop.entities.UserRoles;
import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private String password;
    private UserRoles role;

}


