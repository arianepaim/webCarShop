package com.desenvolvimento.webCarShop.config;

import com.desenvolvimento.webCarShop.entities.User;
import com.desenvolvimento.webCarShop.entities.UserRoles;
import com.desenvolvimento.webCarShop.entities.Vehicle;
import com.desenvolvimento.webCarShop.repositories.UserRepository;
import com.desenvolvimento.webCarShop.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            String passwordAdmin = passwordEncoder.encode("12345@Ri");
            String passwordUser = passwordEncoder.encode("12345R@v");

            User admin = new User("Ariane Paim", "ariane@gmail.com", passwordAdmin, UserRoles.ADMIN);
            User user = new User("Ravi Ribeiro", "ravi@gmail.com", passwordUser, UserRoles.USER);

            userRepository.save(admin);
            userRepository.save(user);
        }

        if (vehicleRepository.count() == 0) {
            Vehicle vehicle1 = new Vehicle(null, "Fiesta", "Ford", "Hatch", 50000.0, 2022, "Prata", "https://s2-autoesporte.glbimg.com/ZzkXZV0P_zEsyzRku27SSdmU0Ck=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/v/y/EGkAobSkApI6m0nCermA/2013-04-09-fiesta-rocam-940-01.jpg");
            Vehicle vehicle2 = new Vehicle(null, "Prius", "Toyota", "Sedan", 70000.0, 2021, "Prata", "https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_840,h_561/https://carroeletrico.com.br/wp-content/uploads/2017/10/Prius5-2-1024x684.png");
            Vehicle vehicle3 = new Vehicle(null, "Corolla", "Toyota", "Sedan", 80000.0, 2021, "Branco", "https://cdn.motor1.com/images/mgl/O64MB/s1/toyota-corolla-gr-s-2022-em-destaque.jpg");
            Vehicle vehicle4 = new Vehicle(null, "Yaris", "Toyota", "Hatch", 85000.0, 2020, "Prata", "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F426f8531-70f8-4ebf-8094-cc152c0441a6%2FToyota_Yaris.webp?table=block&id=5dae1cf0-4572-4ca3-8c83-7f29d5b1d509&cache=v2");
            Vehicle vehicle5 = new Vehicle(null, "Civic", "Honda", "Sedan", 90000.0, 2021, "Branco", "https://s2-autoesporte.glbimg.com/8AsyIQCc2_sNbOsJXNUPQI87qYw=/0x0:1920x1080/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/U/M/0AQABNTsW6kmItO0mGaQ/sem-titulo.jpg");
            Vehicle vehicle6 = new Vehicle(null, "Hilux", "Toyota", "Camioneta", 150000.0, 2022, "Verde", "https://s2-autoesporte.glbimg.com/OxyaYHlhU189ePBSMzKJiXgZVmQ=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/r/t/ep2d8wRECqx7357S2TcQ/2020-06-04-toyota-hilux-2021-1600-01.jpg");
            Vehicle vehicle7 = new Vehicle(null, "Camry", "Toyota", "Sedan", 350000.0, 2022, "Prata", "https://s2-autoesporte.glbimg.com/JR5DhkIElu7jRsAAvhvr2E7y_Ro=/0x0:620x413/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/6/z/uiNmhfTEqUPBqL6xszhA/2018-06-14-camryfrtente.jpg");
            Vehicle vehicle8 = new Vehicle(null, "RAV4", "Toyota", "Sedan", 350000.0, 2023, "Preto", "https://media.toyota.com.ar/24270e31-3608-4461-907d-e805e2d46caa.png");

            vehicleRepository.save(vehicle1);
            vehicleRepository.save(vehicle2);
            vehicleRepository.save(vehicle3);
            vehicleRepository.save(vehicle4);
            vehicleRepository.save(vehicle5);
            vehicleRepository.save(vehicle6);
            vehicleRepository.save(vehicle7);
            vehicleRepository.save(vehicle8);
        }
    }
}
