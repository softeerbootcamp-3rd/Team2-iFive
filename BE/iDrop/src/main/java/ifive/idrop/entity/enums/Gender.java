package ifive.idrop.entity.enums;

import lombok.Getter;

@Getter
public enum Gender {
    MALE("남성"),
    FEMALE("여성");
    private final String gender;

    Gender(String gender) {
        this.gender = gender;
    }

    public static Gender of(String gender) {
        if ("남성".equals(gender)) {
            return Gender.MALE;
        }
        if ("여성".equals(gender)) {
            return Gender.FEMALE;
        }
        throw new RuntimeException();
    }
}
