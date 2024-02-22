package ifive.idrop.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
        private PickUpInfoStatus status;
        private LocalDateTime startTime;
        private String startImage;

        @JsonIgnore
        private LocalDateTime endTime;

        @JsonIgnore
        private String endImage;

        static Info toEntity(PickUp pickUp) {
            return Info.builder()
                    .startTime(pickUp.getStartTime())
                    .startImage(pickUp.getStartImage())
                    .endTime(pickUp.getEndTime())
                    .endImage(pickUp.getEndImage())
                    .status(pickUp.getEndTime() != null ? PickUpInfoStatus.DONE : PickUpInfoStatus.START)
                    .build();
        }
    }
}
