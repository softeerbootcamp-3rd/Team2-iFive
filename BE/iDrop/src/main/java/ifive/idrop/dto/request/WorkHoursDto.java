package ifive.idrop.dto.request;

import ifive.idrop.entity.Driver;
import ifive.idrop.entity.WorkHours;
import lombok.Getter;

@Getter
public class WorkHoursDto {
    private String day;
    private int startHour;
    private int startMinute;
    private int endHour;
    private int endMinute;

    public WorkHours toEntity(Driver driver) {
        return new WorkHours(day, startHour, startMinute, endHour, endMinute, driver);
    }
}
