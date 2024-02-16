package ifive.idrop.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ReservedSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reserved_schedule_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
    private Driver driver;

    private LocalDateTime reservedTime;
}
