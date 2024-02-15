package ifive.idrop.utils;

import org.json.simple.JSONObject;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public class ScheduleUtils {
    public static List<String> DAY_OF_WEEKS; //["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    public static final int EXPIRATION = 28; //4주의 유효 기간

    static {
        DAY_OF_WEEKS = Arrays.stream(DayOfWeek.values())
                .map(d -> d.getDisplayName(TextStyle.SHORT, Locale.US))
                .toList();
    }

    public static RequestSchedule parseToList(JSONObject schedule) {
        RequestSchedule requestSchedule = new RequestSchedule();
        LocalDateTime now = LocalDateTime.now().withSecond(0).withNano(0);
        int dayOfToday = now.getDayOfWeek().getValue();

        for (int i = 0; i < 7; i++) {
            Map<String, Integer> dayObject = (Map<String, Integer>) schedule.get(DAY_OF_WEEKS.get(i));
            if (dayObject != null) {
                int hour = dayObject.get("hour");
                int minute = dayObject.get("min");
                int difference = getDifferenceOfDayOfWeek(i + 1, dayOfToday);
                for (int d = difference; d <= EXPIRATION; d += 7) {
                    if (d == 0)
                        continue; //당일은 제외
                    requestSchedule.addSchedule(now.plusDays(d).withHour(hour).withMinute(minute));
                }
            }
        }
        return requestSchedule;
    }

    private static int getDifferenceOfDayOfWeek(int from, int to) {
        return (from - to >= 0) ? from - to : from - to + 7;
    }
}
