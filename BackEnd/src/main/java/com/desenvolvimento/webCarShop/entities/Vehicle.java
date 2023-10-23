package com.desenvolvimento.webCarShop.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Entity
@Table(name = "tb_vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @NotBlank
    @Size(min = 3, message = "O nome deve conter no mínimo 3 caracteres.")
    private String name;
    @NotNull
    @NotBlank
    private String brand;
    @NotNull
    @NotBlank
    private String model;
    @NotNull
    private Double price;
    @NotNull
    private Integer year;
    @NotNull
    @NotBlank
    private String color;
    @Column(columnDefinition = "TEXT")
    private String image;
}
