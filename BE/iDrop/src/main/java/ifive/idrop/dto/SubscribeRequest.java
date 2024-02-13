package ifive.idrop.dto;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class SubscribeRequest {
    private Long driverId;
    private String childName;
    private String startLocation;
    private Double startLongitude;
    private Double startLatitude;
    private String endLocation;
    private Double endLongitude;
    private Double endLatitude;
    private String requestDate;
}
