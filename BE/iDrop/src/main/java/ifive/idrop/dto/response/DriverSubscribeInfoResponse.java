package ifive.idrop.dto.response;

import ifive.idrop.entity.*;
import lombok.Builder;
import lombok.Getter;
import org.json.simple.JSONObject;

import java.time.LocalDate;

import static ifive.idrop.util.ScheduleUtils.*;

@Builder
@Getter
public class DriverSubscribeInfoResponse {
    private Long pickUpInfoId;
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

    public static DriverSubscribeInfoResponse of(PickUpInfo pickUpInfo) {
        Child child = pickUpInfo.getChild();
        Parent parent = child.getParent();
        PickUpSubscribe pickUpSubscribe = pickUpInfo.getPickUpSubscribe();
        PickUpLocation pickUpLocation = pickUpInfo.getPickUpLocation();

        LocalDate startDate = calculateStartDate(pickUpSubscribe.getModifiedDate());
        LocalDate endDate = calculateEndDate(pickUpSubscribe.getModifiedDate());

        return DriverSubscribeInfoResponse.builder()
                .pickUpInfoId(pickUpInfo.getId())
                .parentName(parent.getName())
                .parentPhoneNumber(parent.getPhoneNumber())
                .childName(child.getName())
                .childBirth(child.getBirth())
                .childGender(child.getGender().getGender())
                .childImage(child.getImage())
                .startDate(startDate)
                .endDate(endDate)
                .startAddress(pickUpLocation.getStartAddress())
                .endAddress(pickUpLocation.getEndAddress())
                .status(pickUpSubscribe.getStatus().getStatus())
                .schedule(toJSONObject(pickUpInfo.getSchedule()))
                .build();
    }
}
