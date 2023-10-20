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

            Vehicle vehicle1 = new Vehicle(null, "Fiesta", "Ford", "Hatch", 50000.0, 2022, "Prata", "https://s2-autoesporte.glbimg.com/ZzkXZV0P_zEsyzRku27SSdmU0Ck=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/v/y/EGkAobSkApI6m0nCermA/2013-04-09-fiesta-rocam-940-01.jpg;https://quatrorodas.abril.com.br/wp-content/uploads/2017/11/fiesta-titanium-plus-3-e1511373513275.jpg?quality=70&strip=info;https://www.autosnovos.com/wp-content/uploads/2016/12/novo-fiesta-2018-03.jpg");
            Vehicle vehicle2 = new Vehicle(null, "Prius", "Toyota", "Sedan", 70000.0, 2021, "Prata", "https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_840,h_561/https://carroeletrico.com.br/wp-content/uploads/2017/10/Prius5-2-1024x684.png;https://quatrorodas.abril.com.br/wp-content/uploads/2019/08/longa-duraccca7acc83o-desmonte-prius-3-e1565973247493.jpg?quality=70&strip=info;https://s3.amazonaws.com/www.revistacarro.com.br/static/images/uploads/priuslado_620x250.jpg");
            Vehicle vehicle3 = new Vehicle(null, "Corolla", "Toyota", "Sedan", 80000.0, 2021, "Branco", "https://cdn.motor1.com/images/mgl/O64MB/s1/toyota-corolla-gr-s-2022-em-destaque.jpg;https://s2-autoesporte.glbimg.com/0DMOtZ8u6o5B7eAPvRrqI8AK3Ak=/0x0:940x628/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/Y/A/XsAPK9Sdi4LZbPpuzRSQ/2019-09-03-toyota-corolla-2.0l-dynamic-force-13.jpg;https://3.bp.blogspot.com/-5_bHjgWOMWM/WTXsFHUZuwI/AAAAAAACld8/KMBdhHHb1IUw2mV-oDXDjtqGSZBi3pViwCLcB/s1600/Novo-Toyota-Corolla-2018%2B%252880%2529.jpg");
            Vehicle vehicle4 = new Vehicle(null, "Yaris", "Toyota", "Hatch", 85000.0, 2020, "Prata", "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F426f8531-70f8-4ebf-8094-cc152c0441a6%2FToyota_Yaris.webp?table=block&id=5dae1cf0-4572-4ca3-8c83-7f29d5b1d509&cache=v2;https://s2-autoesporte.glbimg.com/9nMKHRJFsJWE2E-sp8depiZ4vN8=/0x0:620x413/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/v/M/6qRy0vQqe7HQ6yt6rwnA/2018-06-07-40.jpg;https://garagem360.com.br/wp-content/uploads/2023/05/Toyota-Yaris-Seda-XL-2023-4.jpg");
            Vehicle vehicle5 = new Vehicle(null, "Civic", "Honda", "Sedan", 90000.0, 2021, "Branco", "https://s2-autoesporte.glbimg.com/8AsyIQCc2_sNbOsJXNUPQI87qYw=/0x0:1920x1080/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2022/U/M/0AQABNTsW6kmItO0mGaQ/sem-titulo.jpg;https://revistacarro.com.br/wp-content/uploads/2019/10/Honda-Civic_3.jpg;https://www.mazettoseguros.com.br/blog/wp-content/uploads/2018/04/seguro-honda-civic.jpg");
            Vehicle vehicle6 = new Vehicle(null, "Hilux", "Toyota", "Camioneta", 150000.0, 2022, "Verde", "https://s2-autoesporte.glbimg.com/OxyaYHlhU189ePBSMzKJiXgZVmQ=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/r/t/ep2d8wRECqx7357S2TcQ/2020-06-04-toyota-hilux-2021-1600-01.jpg;https://1.bp.blogspot.com/-8MJCHaa5m-o/XthS3Z7YXXI/AAAAAAAAeM4/t5C9Fb9VjlYItwxlwdqZ5ui3GDbFnaFZwCLcBGAsYHQ/s1600/Toyota-Hilux-2021%2B%252824%2529.jpg;https://s2.glbimg.com/o9EW4nc1LDh3Mdco61EsiDAqNZU=/0x0:5000x3731/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/U/a/MuwcJkTlK0sXTwqOIppA/hilux3-4back.jpg");
            Vehicle vehicle7 = new Vehicle(null, "Camry", "Toyota", "Sedan", 350000.0, 2022, "Prata",  "https://s2-autoesporte.glbimg.com/JR5DhkIElu7jRsAAvhvr2E7y_Ro=/0x0:620x413/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/6/z/uiNmhfTEqUPBqL6xszhA/2018-06-14-camryfrtente.jpg;https://revistacarro.com.br/toyota-camry-2022-aparece-em-registro-no-brasil/toyota-camry-hybrid_4/;https://s2-autoesporte.glbimg.com/G5CjTnNBAu8EUOkpFpKrlV85BVI=/0x0:620x413/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/1/X/0z8lcMQXW07dHBfBaa6w/2018-06-14-camryuperfil.jpg");
            Vehicle vehicle8 = new Vehicle(null, "RAV4", "Toyota", "Sedan", 350000.0, 2023, "Preto", "https://media.toyota.com.ar/24270e31-3608-4461-907d-e805e2d46caa.png;https://s2-autoesporte.glbimg.com/4LjP-U81FsF9emxeGDkAT4Xj178=/0x0:620x413/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/B/N/6oA6TXT4OkGMfSKOQxFA/2019-03-22-2019-toyota-rav4-limited-hv-rubyflarepearl-62-fcbc55079211f9e26c35ea57ba3b21920599392b.jpg;https://1.bp.blogspot.com/-HKGGmRyopeQ/XyK9mSXMj_I/AAAAAAAAgw4/3G3TomC00ksPK_NMoGT4dcbuO4I8_Be9gCLcBGAsYHQ/s1600/rav43-4rear.jpg");

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
