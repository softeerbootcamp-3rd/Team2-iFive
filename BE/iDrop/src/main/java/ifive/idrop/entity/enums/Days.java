package ifive.idrop.entity.enums;

public enum Days {
    SUN("Sun", "SUNDAY"),
    MON("Mon", "MONDAY"),
    TUE("Tue", "THUESDAY"),
    WED("Wed", "WEDNESDAY"),
    THU("Thu", "THURSDAY"),
    FRI("Fri", "FRIDAY"),
    SAT("Sat", "SATURDAY");

    private final String day;
    private final String fullDate;

    Days(String day, String fullDate) {
        this.day = day;
        this.fullDate = fullDate;
    }

    public String getDay() {
        return day;
    }

    public String getFullDate() {
        return fullDate;
    }

    public static String getDayEnum(String day) {
        for (Days d : Days.values()) {
            if (d.getDay().equalsIgnoreCase(day)) {
                return d.getFullDate();
            }
        }
        return null;
    }
}

