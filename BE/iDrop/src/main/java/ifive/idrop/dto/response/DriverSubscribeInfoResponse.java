package ifive.idrop.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.json.simple.JSONObject;

import java.time.LocalDate;

@Builder
@Getter
public class DriverSubscribeInfoResponse {
    private Long pickupInfoId;
    private String parentName;
    private String parentPhoneNumber;
    private String childName;
    private LocalDate childBirth;
    private String childGender;
    private String childImage;
    private LocalDate startDate;
    private LocalDate endDate;
    private String startAddress; //출발지 주소
    private String endAddress; //목적지 주소
    private String status;
    private JSONObject schedule;
}
