package ifive.idrop.util;

import ifive.idrop.entity.WorkHours;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import static ifive.idrop.util.ScheduleUtils.*;

@Getter
public class RequestSchedule {
    private List<LocalDateTime> requestSchedule = new ArrayList<>();

    public void addSchedule(LocalDateTime schedule) {
        requestSchedule.add(schedule);
    }

    public void sortSchedule() {
        Collections.sort(requestSchedule);
    }

    public boolean isAvailable(List<WorkHours> workHoursList, List<LocalDateTime> reservedSchedule) {
        if (isInWorkHours(workHoursList) && isReservable(reservedSchedule))
            return true;
        return false;
    }

    public boolean isInWorkHours(List<WorkHours> workHoursList) {
        sortSchedule();
        for (int i = 0; i < requestSchedule.size(); i++) {
            if (i >= 7) {
                break; //모든 요일이 가능하다는 것을 확인했으면 더 확인할 필요가 없으므로 반복문 종료
            }
            LocalDateTime schedule = requestSchedule.get(i);
            LocalTime requestTime = LocalTime.of(schedule.getHour(), schedule.getMinute());

            String requestDayOfWeek = DAY_OF_WEEKS.get(schedule.getDayOfWeek().getValue() - 1);
            List<WorkHours> WorkHoursOfSpecificDayOfWeek = workHoursList.stream()
                    .filter(w -> w.getDay().equals(requestDayOfWeek))
                    .toList(); //특정 요일의 업무 시간이 오전, 오후 등 여러개가 있을 수 있으므로 리스트로 변환함

            if (WorkHoursOfSpecificDayOfWeek.isEmpty())
                return false;
            boolean available = false;
            for (WorkHours workHours : WorkHoursOfSpecificDayOfWeek) {
                LocalTime startTime = LocalTime.of(workHours.getStartHour(), workHours.getStartMinute());
                LocalTime endTime = LocalTime.of(workHours.getEndHour(), workHours.getEndMinute());

                if ((requestTime.equals(startTime) || requestTime.isAfter(startTime))
                        && (requestTime.equals(endTime.minusHours(1)) || requestTime.isBefore(endTime.minusHours(1))))
                    available = true;
            }
            if (!available)
                return false;
        }
        return true;
    }

    public boolean isReservable(List<LocalDateTime> reservedSchedule) {
        List<LocalDateTime> concatSchedule = Stream.concat(requestSchedule.stream(), reservedSchedule.stream())
                .sorted()
                .toList(); //이미 예약된 스케줄과 새로 요청을 한 스케줄을 합쳐서 시간순으로 정렬한 후 리스트로 변환
        for (int i = 0; i < concatSchedule.size() - 1; i++) {
            LocalDateTime before = concatSchedule.get(i);
            LocalDateTime after = concatSchedule.get(i + 1);

            if (before.plusHours(1).isAfter(after)) //이후 스케줄은 이전 스케줄과 최소 한 시간의 간격이 있어야 한다.
                return false; //그렇지 않으면 예약할 수 없다.
        }
        return true;
    }
}
