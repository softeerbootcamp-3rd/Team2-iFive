package ifive.idrop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class PickUpInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pickup_info_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "pickup_location_id")
    private PickUpLocation pickUpLocation;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "child_id")
    private Child child;

    private String schedule;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "pickUpInfo")
    private PickUpSubscribe pickUpSubscribe;

    public void updatePickUpSubscribe(PickUpSubscribe pickUpSubscribe) {
        this.pickUpSubscribe = pickUpSubscribe;
        pickUpSubscribe.setPickUpInfo(this);
    }

    public void updatePickUpLocation(PickUpLocation location) {
        this.pickUpLocation = location;
    }

    @OneToMany(mappedBy = "pickUpInfo")
    @Builder.Default
    private List<PickUp> pickUpList = new ArrayList<>();
}
