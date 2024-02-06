package ifive.idrop.entity;

import ifive.idrop.entity.enums.Gender;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driver_id")
    private Long id;
    private String name;
    private Gender gender;
    private LocalDate birth;
    private String image;
    private String phone;
    @Lob
    private String career;
    @Lob
    private String introduction;
    private Double driverScore;
    private Double score;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private Car car;

    @OneToMany(mappedBy = "driver")
    private List<PickUpInfo> pickUpInfoList = new ArrayList<>();
}
