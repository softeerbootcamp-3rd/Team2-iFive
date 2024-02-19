package ifive.idrop.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.json.simple.JSONObject;

import java.time.LocalDateTime;

@Builder
@Getter
public class SubscribeInfoResponse {
    Long pickupInfoId;
    String driverName;
    String driverImage;
    LocalDateTime startDate;
    LocalDateTime expiryDate;
    String startAddress; //출발지 주소
    String endAddress; //목적지 주소
    String status;
    JSONObject schedule;
}
