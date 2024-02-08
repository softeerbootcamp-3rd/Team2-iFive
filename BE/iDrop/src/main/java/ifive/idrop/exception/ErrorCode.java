package ifive.idrop.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
@AllArgsConstructor
public enum ErrorCode {
    INVALID_ROLE_OF_USER(HttpStatus.BAD_REQUEST, "회원의 역할이 정확하지 않습니다", "역할은 '기사' 또는 '부모' 중 하나여야 합니다."),
    DUPLICATE_USERID_ERROR(HttpStatus.BAD_REQUEST, "이미 존재하는 아이디입니다.", "다른 아이디를 입력해주세요.");

    private final HttpStatus httpStatus;
    private final String message;
    private final String solution;
}

