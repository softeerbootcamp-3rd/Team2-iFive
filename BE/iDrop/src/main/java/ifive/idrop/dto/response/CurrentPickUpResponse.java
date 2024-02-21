package ifive.idrop.dto.response;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import ifive.idrop.entity.PickUpInfo;
import ifive.idrop.entity.PickUpLocation;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Getter
public class CurrentPickUpResponse {
    private Long childId;
    private String childName;
    private String childImage;
    private LocalDateTime startDate;    // 구독 승인 날짜
    private LocalDateTime endDate;      // 구독 마감 날짜

    @JsonUnwrapped
    private Destination destination;

    @JsonUnwrapped
    private TimeInfo timeInfo;

    static public CurrentPickUpResponse of(PickUpInfo pickUpInfo, LocalDateTime reservedTime) {
        return CurrentPickUpResponse.builder()
                .childId(pickUpInfo.getChild().getId())
                .childName(pickUpInfo.getChild().getName())
                .childImage(pickUpInfo.getChild().getImage())
                .startDate(pickUpInfo.getPickUpSubscribe().getModifiedDate().plusDays(1))
                .endDate(pickUpInfo.getPickUpSubscribe().getExpiredDate().minusDays(1))
                .destination(Destination.of(pickUpInfo.getPickUpLocation()))
                .timeInfo(TimeInfo.of(reservedTime))
                .build();
    }

    @Builder
    @AllArgsConstructor
    @Getter
    static class TimeInfo {
        private LocalDateTime pickUpStartTime;  // 실제 픽업 시작 시간
        private LocalDateTime pickUpEndTime;    // 실제 픽업 마감 시간

        static public TimeInfo of(LocalDateTime reservedTime) {
            return TimeInfo.builder()
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

        static public Destination of(PickUpLocation location) {
            return Destination.builder()
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
