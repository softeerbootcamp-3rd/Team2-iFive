package ifive.idrop.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_id")
    private Long id;
    private String carNumber;
    private String type;
    private String color;

    @OneToOne(mappedBy = "car", fetch = FetchType.LAZY)
    private Driver driver;
}
