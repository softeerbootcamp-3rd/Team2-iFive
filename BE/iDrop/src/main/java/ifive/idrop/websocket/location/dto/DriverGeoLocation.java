package ifive.idrop.websocket.location.dto;

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

    public boolean isSameLocation(Location location) {
        return this.longitude.equals(location.getLongitude()) && this.latitude.equals(location.getLatitude());
    }

    public Location getLocation() {
        return new Location(longitude, latitude);
    }
}
