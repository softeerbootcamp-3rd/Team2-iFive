package ifive.idrop.websocket.location.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class CurrentPickUp {
    private Long childId;
    private Long parentId;
    private LocalDateTime reservedTime;
    private Double startLongitude;
    private Double startLatitude;
    private Double endLongitude;
    private Double endLatitude;
}
