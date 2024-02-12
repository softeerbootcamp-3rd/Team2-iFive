package ifive.idrop.dto;

import lombok.Getter;

@Getter
public class SubscribeLocationRequest {
    private String startLocation;
    private Double startLongitude;
    private Double startLatitude;
    private String endLocation;
    private Double endLongitude;
    private Double endLatitude;
    private String cronDate;
}
