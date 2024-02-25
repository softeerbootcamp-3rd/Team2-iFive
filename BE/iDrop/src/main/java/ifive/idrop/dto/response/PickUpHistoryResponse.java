package ifive.idrop.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import ifive.idrop.entity.PickUp;
import ifive.idrop.entity.enums.PickUpInfoStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
public class PickUpHistoryResponse {
    private LocalDate date;
    private String day;
    private Info info;

    public static PickUpHistoryResponse toEntity(PickUp pickUp) {
        String time = pickUp.getReservedTime().toLocalTime().toString();
        return PickUpHistoryResponse.builder()
                .date(pickUp.getReservedTime().toLocalDate())
                .day(time + " " + pickUp.getReservedTime().getDayOfWeek())
                .info(Info.toEntity(pickUp))
                .build();
    }
    @Builder
    @Getter
    static class Info {
        private String status;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private LocalDateTime startTime;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private String startImage;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private String startAddress;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private LocalDateTime endTime;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private String endImage;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private String endAddress;

        static Info toEntity(PickUp pickUp) {
            if (pickUp.getEndTime() == null) {
                return Info.builder()
                        .status(PickUpInfoStatus.START.getStatus())
                        .startTime(pickUp.getStartTime())
                        .startImage(pickUp.getStartImage())
                        .startAddress(pickUp.getPickUpInfo().getPickUpLocation().getStartAddress())
                        .endAddress(pickUp.getPickUpInfo().getPickUpLocation().getEndAddress())
                        .build();
            }

            return Info.builder()
                    .endTime(pickUp.getEndTime())
                    .endImage(pickUp.getEndImage())
                    .startAddress(pickUp.getPickUpInfo().getPickUpLocation().getStartAddress())
                    .endAddress(pickUp.getPickUpInfo().getPickUpLocation().getEndAddress())
                    .status(PickUpInfoStatus.DONE.getStatus())
                    .build();
        }
    }
}
