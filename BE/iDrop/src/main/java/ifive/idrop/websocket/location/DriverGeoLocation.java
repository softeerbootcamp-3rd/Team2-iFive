package ifive.idrop.websocket.location;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DriverGeoLocation {
    private Double longitude;
    private Double latitude;
    private LocalDateTime createdAt;
}
