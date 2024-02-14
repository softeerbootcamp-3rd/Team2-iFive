package ifive.idrop.entity.enums;

public enum Days {
    SUN("SUN", "SUNDAY"),
    MON("MON", "MONDAY"),
    WED("WED", "WEDNESDAY"),
    THR("THR", "THURSDAY"),
    FRI("FRI", "FRIDAY"),
    SAT("SAT", "SATURDAY");

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

