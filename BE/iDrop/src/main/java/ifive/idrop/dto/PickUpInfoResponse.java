package ifive.idrop.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PickUpInfoResponse {
    private String startAddress;
    private String endAddress;
    private String childImage;
    private String childName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
