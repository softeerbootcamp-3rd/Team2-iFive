package ifive.idrop.entity;

import jakarta.persistence.*;

@Entity
public class PickUpLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pickup_location_id")
    private Long id;
    private String startAddress;
    private Double startLongitude;
    private Double startLatitude;
    private String endAddress;
    private Double endLongitude;
    private Double endLatitude;
}
