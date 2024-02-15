package ifive.idrop.dto;

import lombok.Getter;
import org.json.simple.JSONObject;

@Getter
public class DriverListRequest {
    String startAddress;
    Double startLongitude;
    Double startLatitude;
    String endAddress;
    Double endLongitude;
    Double endLatitude;
    JSONObject schedule;
}
