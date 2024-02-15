package ifive.idrop.util;

import ifive.idrop.entity.enums.Days;
import org.json.JSONException;
import org.json.simple.JSONObject;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.chrono.ChronoLocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class Parser {
    static public List<LocalDateTime> parseSchedule(JSONObject schedule, LocalDateTime expiredDate) throws JSONException {
        List<LocalDateTime> scheduleList = new ArrayList<>();
        Iterator<String> keys = schedule.keySet().iterator();
        while (keys.hasNext()) {
            String key = keys.next();
            DayOfWeek dayOfWeek = DayOfWeek.valueOf(Days.getDayEnum(key));   // 날짜를 DayOfWeek 타입으로 변환
            Map<String, Integer> timeMap = (Map<String, Integer>) schedule.get(key);
            LocalDate date = findNearDateByday(dayOfWeek);  // 가장 인접한 날짜 탐색

            for (int i = 0; i < 4; i++) {
                LocalDateTime dateTime = LocalDateTime.of(date, LocalTime.of(timeMap.get("hour"), timeMap.get("min")));
                scheduleList.add(dateTime);
                date = date.plusWeeks(1);
                if (date.isAfter(ChronoLocalDate.from(expiredDate))) {
                    break;
                }
            }
        }
        return scheduleList;
    }

    static private LocalDate findNearDateByday(DayOfWeek day) {
        LocalDate today = LocalDate.now();
        return today.with(TemporalAdjusters.next(day));
    }
}
