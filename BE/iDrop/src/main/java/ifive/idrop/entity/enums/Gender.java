package ifive.idrop.entity.enums;

import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
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
        throw new CommonException(ErrorCode.INVALID_GENDER);
    }
}
