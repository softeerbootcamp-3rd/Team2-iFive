package ifive.idrop.dto;

import lombok.Getter;

@Getter
public class SubscribeRequest {
    private Long driverId;
    private String childName;
    private String startAddress;
    private Double startLongitude;
    private Double startLatitude;
    private String endAddress;
    private Double endLongitude;
    private Double endLatitude;
    private String requestDate;
}
