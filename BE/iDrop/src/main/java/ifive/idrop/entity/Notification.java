package ifive.idrop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Table(indexes = @Index(name = "idx_date", columnList = "pickUpAlarmTime"))
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime pickUpAlarmTime;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;
}
