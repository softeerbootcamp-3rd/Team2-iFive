package ifive.idrop.entity;

import ifive.idrop.entity.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DiscriminatorValue("D")
public class Driver extends Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driver_id")
    private Long id;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private LocalDate birth;
    private String image;
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
