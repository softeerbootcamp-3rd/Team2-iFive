package ifive.idrop.entity;

import ifive.idrop.entity.enums.PickUpStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class PickUpSubscribe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pickup_subscribe_id")
    private Long id;
    @Enumerated(EnumType.STRING)
    private PickUpStatus status;
    private LocalDateTime requestDate;
    private LocalDateTime modifiedDate;
    private LocalDateTime expiredDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pickup_info_id")
    private PickUpInfo pickUpInfo;

    public void setPickUpInfo(PickUpInfo pickUpInfo) {
        this.pickUpInfo = pickUpInfo;
    }
}
