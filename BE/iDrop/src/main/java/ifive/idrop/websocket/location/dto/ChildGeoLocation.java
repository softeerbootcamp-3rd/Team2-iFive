package ifive.idrop.websocket.location.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ChildGeoLocation {
    private Long childId;
    private Double longitude;
    private Double latitude;
    private LocalDateTime createdAt;

    public ChildGeoLocation(DriverGeoLocation driverGeoLocation, Long childId) {
        this.longitude = driverGeoLocation.getLongitude();
        this.latitude = driverGeoLocation.getLatitude();
        this.createdAt = driverGeoLocation.getCreatedAt();
        this.childId = childId;
    }
}
