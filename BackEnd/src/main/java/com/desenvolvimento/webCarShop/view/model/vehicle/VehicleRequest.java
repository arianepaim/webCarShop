package com.desenvolvimento.webCarShop.view.model.vehicle;

import lombok.Data;

@Data
public class VehicleRequest {

    private String name;
    private String brand;
    private String model;
    private Double price;
    private Integer year;
    private String color;
    private String image;
}
