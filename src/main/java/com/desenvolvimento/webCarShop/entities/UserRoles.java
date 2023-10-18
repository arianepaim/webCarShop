package com.desenvolvimento.webCarShop.entities;

import jakarta.persistence.Column;

public enum UserRoles {
    ADMIN("admin"),
    USER("user");

    private String role;


    UserRoles(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
