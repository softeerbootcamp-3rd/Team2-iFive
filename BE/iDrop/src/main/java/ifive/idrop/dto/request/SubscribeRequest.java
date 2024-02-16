package ifive.idrop.dto.request;

import lombok.Getter;
import org.json.simple.JSONObject;

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
    private JSONObject dateRequest;
}
