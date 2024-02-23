package ifive.idrop.dto.response;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import ifive.idrop.entity.PickUpInfo;
import ifive.idrop.entity.PickUpLocation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Getter
public class DriverTodayRemainingPickUpResponse {

    private Long childId;
    private String childName;
    private String childImage;

    @JsonUnwrapped
    private Destination destination;

    @JsonUnwrapped
    private TimeInfo timeInfo;

    static public DriverTodayRemainingPickUpResponse of(PickUpInfo pickUpInfo, LocalDateTime reservedTime) {
        return DriverTodayRemainingPickUpResponse.builder()
                .childId(pickUpInfo.getChild().getId())
                .childName(pickUpInfo.getChild().getName())
                .childImage(pickUpInfo.getChild().getImage())
                .destination(DriverTodayRemainingPickUpResponse.Destination.of(pickUpInfo.getPickUpLocation()))
                .timeInfo(DriverTodayRemainingPickUpResponse.TimeInfo.of(reservedTime))
                .build();
    }

    @Builder
    @AllArgsConstructor
    @Getter
    static class TimeInfo {
        private LocalDateTime pickUpStartTime;  // 실제 픽업 시작 시간
        private LocalDateTime pickUpEndTime;    // 실제 픽업 마감 시간

        static public DriverTodayRemainingPickUpResponse.TimeInfo of(LocalDateTime reservedTime) {
            return DriverTodayRemainingPickUpResponse.TimeInfo.builder()
                    .pickUpStartTime(reservedTime)
                    .pickUpEndTime(reservedTime.plusHours(1))
                    .build();
        }
    }

    @Builder
    @AllArgsConstructor
    @Getter
    static class Destination {
        private Double startLatitude;
        private Double startLongitude;
        private String startAddress;
        private Double endLatitude;
        private Double endLongitude;
        private String endAddress;

        static public DriverTodayRemainingPickUpResponse.Destination of(PickUpLocation location) {
            return DriverTodayRemainingPickUpResponse.Destination.builder()
                    .startAddress(location.getStartAddress())
                    .startLatitude(location.getStartLatitude())
                    .startLongitude(location.getStartLongitude())
                    .endAddress(location.getEndAddress())
                    .endLatitude(location.getEndLatitude())
                    .endLongitude(location.getEndLongitude())
                    .build();
        }
    }
}
