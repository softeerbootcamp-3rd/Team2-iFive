package ifive.idrop.dto.response;

import ifive.idrop.entity.Driver;
import ifive.idrop.entity.PickUpInfo;
import ifive.idrop.entity.PickUpLocation;
import ifive.idrop.entity.PickUpSubscribe;
import ifive.idrop.util.ScheduleUtils;
import lombok.Builder;
import lombok.Getter;
import org.json.simple.JSONObject;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static ifive.idrop.util.ScheduleUtils.calculateEndDate;
import static ifive.idrop.util.ScheduleUtils.calculateStartDate;

@Builder
@Getter
public class ParentSubscribeInfoResponse {
    private Long pickUpInfoId;
    private String driverName;
    private String driverImage;
    private LocalDate startDate;
    private LocalDate endDate;
    private String startAddress; //출발지 주소
    private String endAddress; //목적지 주소
    private String status;
    private JSONObject schedule;

    public static ParentSubscribeInfoResponse of(PickUpInfo pickUpInfo) {
        Driver driver = pickUpInfo.getDriver();
        PickUpSubscribe pickUpSubscribe = pickUpInfo.getPickUpSubscribe();
        PickUpLocation pickUpLocation = pickUpInfo.getPickUpLocation();

        LocalDate startDate = calculateStartDate(pickUpSubscribe.getModifiedDate());
        LocalDate endDate = calculateEndDate(pickUpSubscribe.getModifiedDate());

        return ParentSubscribeInfoResponse.builder()
                .pickUpInfoId(pickUpInfo.getId())
                .driverName(driver.getName())
                .driverImage(driver.getImage())
                .startDate(startDate)
                .endDate(endDate)
                .startAddress(pickUpLocation.getStartAddress())
                .endAddress(pickUpLocation.getEndAddress())
                .status(pickUpSubscribe.getStatus().getStatus())
                .schedule(ScheduleUtils.toJSONObject(pickUpInfo.getSchedule()))
                .build();
    }
}
