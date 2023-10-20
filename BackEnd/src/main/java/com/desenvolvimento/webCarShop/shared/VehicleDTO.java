package com.desenvolvimento.webCarShop.shared;

import lombok.Data;

@Data
public class VehicleDTO {

    private Long id;
    private String name;
    private String brand;
    private String model;
    private Double price;
    private Integer ano;
    private String cor;
    private String image;
}
