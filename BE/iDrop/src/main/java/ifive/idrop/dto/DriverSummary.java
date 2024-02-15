package ifive.idrop.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DriverSummary {
    private Long driverId;
    private String name;
    private String image;
    private String introduction;
    private Double starRate;
}
