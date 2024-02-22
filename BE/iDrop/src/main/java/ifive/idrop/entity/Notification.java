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
@Table(indexes = @Index(name = "idx_date", columnList = "pickUpTime"))
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime pickUpTime;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;
}
