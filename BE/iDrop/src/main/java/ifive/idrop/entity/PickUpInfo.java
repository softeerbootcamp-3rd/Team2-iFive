package ifive.idrop.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class PickUpInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pickup_info_id")
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pickup_location_id")
    private PickUpLocation pickUpLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id")
    private Child child;

    private String schedule;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "pickUpInfo")
    private PickUpSubscribe pickUpSubscribe;

    @OneToMany
    @JoinColumn(name = "pickup_info")
    private List<PickUp> pickUpList = new ArrayList<>();
}
