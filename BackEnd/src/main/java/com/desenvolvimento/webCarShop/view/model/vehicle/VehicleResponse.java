package com.desenvolvimento.webCarShop.view.model.vehicle;

import lombok.Data;

@Data
public class VehicleResponse {

    private Long id;
    private String name;
    private String brand;
    private String model;
    private Double price;
    private Integer ano;
    private String cor;
    private String image;
}
