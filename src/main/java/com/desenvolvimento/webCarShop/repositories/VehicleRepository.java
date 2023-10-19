package com.desenvolvimento.webCarShop.repositories;

import com.desenvolvimento.webCarShop.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findAllByOrderByPriceAsc();
}
