package com.desenvolvimento.webCarShop.view.model;

import lombok.Data;

@Data
public class UpdatePasswordRequest {
    private String oldPassword;
    private String newPassword;

}
