package ifive.idrop.dto;

import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class DriverInformation {
    private Long driverId;
    private String gender;
    private LocalDate birth;
    private String image;
    private String career;
    private String introduction;
    private List<WorkHoursDto> availableTime;
}
