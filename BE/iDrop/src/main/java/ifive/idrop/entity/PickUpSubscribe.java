package ifive.idrop.entity;

import ifive.idrop.entity.enums.PickUpStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

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

    public PickUpStatus modify(PickUpStatus newStatus) {
        this.status = newStatus;
        //상태가 변경된 시간
        this.modifiedDate = LocalDateTime.now();

        if (this.status.equals(PickUpStatus.ACCEPT)) {
            //modifiedDate로부터 29일 후 자정
            this.expiredDate = this.modifiedDate.plusDays(29)
                    .withHour(0).withMinute(0).withSecond(0).withNano(0);
        }
        return this.status;
    }
}
