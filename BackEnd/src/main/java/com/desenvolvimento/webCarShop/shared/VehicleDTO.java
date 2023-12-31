package com.desenvolvimento.webCarShop.shared;

import lombok.Data;

@Data
public class VehicleDTO {

    private Long id;
    private String name;
    private String brand;
    private String model;
    private Double price;
    private Integer year;
    private String color;
    private String image;
}
