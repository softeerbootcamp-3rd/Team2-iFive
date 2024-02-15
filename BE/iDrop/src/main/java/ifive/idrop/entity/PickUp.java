package ifive.idrop.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
public class PickUp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pickup_id")
    private Long id;

    private String startImage;
    private String endImage;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime reservedTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pickup_info_id")
    private PickUpInfo pickUpInfo;

    public boolean isToday() {
        if (reservedTime.toLocalDate().equals(LocalDate.now())) {
            return true;
        }
        return false;
    }
}
