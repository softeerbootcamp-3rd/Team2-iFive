package ifive.idrop.dto;

import lombok.Getter;

@Getter
public class DriverListRequest {
    String startAddress;
    Double startLongitude;
    Double startLatitude;
    String endAddress;
    Double endLongitude;
    Double endLatitude;
    String schedule;
}
