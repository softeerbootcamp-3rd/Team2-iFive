package ifive.idrop.websocket.location;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Location {
    private Double longitude;
    private Double latitude;

    public void update(DriverGeoLocation driverGeoLocation) {
        this.longitude = driverGeoLocation.getLongitude();
        this.latitude = driverGeoLocation.getLatitude();
    }
}
