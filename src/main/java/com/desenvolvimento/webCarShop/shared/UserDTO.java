package com.desenvolvimento.webCarShop.shared;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserDTO {
    @NotNull
    @NotBlank
    @Size(min = 3, message = "O nome deve conter no mínimo 3 caracteres.")
    private String name;
    @NotNull
    @NotBlank
    @Email
    @Column(unique = true)
    private String email;
    @NotNull
    @NotBlank
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$",
            message = "A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra minúscula," +
                    "uma letra maiúscula, um número e um caractere especial (@#$%^&+=).")
    private String password;

}


