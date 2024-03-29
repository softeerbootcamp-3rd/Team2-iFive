package ifive.idrop.dto.request;

import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class DriverInformation {
    private String gender;
    private LocalDate birth;
    private String image;
    private String career;
    private String introduction;
    private List<WorkHoursDto> availableTime;
}
