package ifive.idrop.utils;

import ifive.idrop.entity.WorkHours;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class RequestSchedule {
    private List<LocalDateTime> scheduleList = new ArrayList<>();

    public void addSchedule(LocalDateTime schedule) {
        this.scheduleList.add(schedule);
    }

    public boolean isInWorkHours(List<WorkHours> workHoursList) {
        for (LocalDateTime schedule : scheduleList) {
            int requestHour = schedule.getHour();
            int requestMinute = schedule.getMinute();
            LocalTime requestTime = LocalTime.of(requestHour, requestMinute);
            DayOfWeek dayOfWeek = schedule.getDayOfWeek();

            List<WorkHours> dayList = workHoursList.stream().filter(m -> m.getDay().equals(dayOfWeek)).toList();
            if (dayList.isEmpty())
                return false;
            for (WorkHours workHours : dayList) {
                int startHour = workHours.getStartHour();
                int startMinute = workHours.getStartMinute();
                LocalTime startTime = LocalTime.of(startHour, startMinute);

                int endHour = workHours.getEndHour();
                int endMinute = workHours.getEndMinute();
                LocalTime endTime = LocalTime.of(endHour, endMinute);

                if (requestTime.isBefore(startTime) || requestTime.isAfter(endTime.minusHours(1)))
                    return false;
            }
        }
        return true;
    }

    public boolean isAvailable(List<LocalDateTime> reservedSchedules) {
        List<LocalDateTime> concatList = Stream.concat(reservedSchedules.stream(), scheduleList.stream()).sorted().toList();
        for (int i = 0; i < concatList.size() - 1; i++) {
            if (concatList.get(i).plusHours(1).isAfter(concatList.get(i + 1)))
                return false;
        }
        return true;
    }
}
