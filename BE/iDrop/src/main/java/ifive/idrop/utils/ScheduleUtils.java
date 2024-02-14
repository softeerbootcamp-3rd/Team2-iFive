package ifive.idrop.utils;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.Locale;

public class ScheduleUtils {
    public static final int expiration = 28; //4주의 유효 기간

    public static RequestSchedule parseToList(String schedule) {
        RequestSchedule requestSchedule = new RequestSchedule();

        LocalDateTime now = LocalDateTime.now().withSecond(0).withNano(0);

        JSONParser parser = new JSONParser();
        JSONObject object = null;
        try {
            object = (JSONObject) parser.parse(schedule);
        } catch (ParseException e) {
        }

        DayOfWeek[] dayOfWeeks = DayOfWeek.values();
        for (int i = 0; i < 7; i++) {
            JSONObject jsonObject = (JSONObject) object.get(dayOfWeeks[i].getDisplayName(TextStyle.SHORT, Locale.US));
            if (jsonObject != null) {
                addScheduleToList(requestSchedule, now, jsonObject, dayOfWeeks[i].getValue());
            }
        }

        return requestSchedule;
    }

    private static void addScheduleToList(RequestSchedule requestSchedule, LocalDateTime now, JSONObject jsonObject, int day) {
        int dayOfToday = now.getDayOfWeek().getValue();
        int difference = getDifferenceOfDayOfWeek(day, dayOfToday);
        for (int d = difference; d <= expiration; d += 7) {
            requestSchedule.addSchedule(now.plusDays(d).withHour(((Long)jsonObject.get("hour")).intValue()).withMinute(((Long)jsonObject.get("min")).intValue()));
        }
    }

    private static int getDifferenceOfDayOfWeek(int from, int to) {
        return (from - to >= 0) ? from - to : from - to + 7;
    }
}
