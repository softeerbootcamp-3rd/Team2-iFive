package ifive.idrop.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
@AllArgsConstructor
public enum ErrorCode {
    TOKEN_NOT_EXIST(HttpStatus.BAD_REQUEST, "Access Token이 존재하지 않습니다.", "다시 로그인 해주세요."),
    INVALID_TOKEN(HttpStatus.BAD_REQUEST, "잘못된 토큰입니다.", "다시 로그인 해주세요."),
    ACCESS_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Access Token이 만료되었습니다.","Access Token을 재발급하기 위해 Refresh Token이 필요합니다." ),
    UNAUTHORIZED_USER(HttpStatus.BAD_REQUEST, "접근 권한이 없는 사용자입니다.", ""),
    INVALID_ROLE_OF_USER(HttpStatus.BAD_REQUEST, "회원의 역할이 정확하지 않습니다.", "역할은 '기사' 또는 '부모' 중 하나여야 합니다."),
    DUPLICATE_USERID(HttpStatus.BAD_REQUEST, "이미 존재하는 아이디입니다.", "다른 아이디를 입력해주세요."),
    USERID_NOT_EXIST(HttpStatus.BAD_REQUEST, "존재하지 않는 아이디입니다.", "아이디를 다시 확인해주세요."),
    PASSWORD_NOT_MATCHED(HttpStatus.BAD_REQUEST, "비밀번호가 맞지 않습니다.", "비밀번호를 다시 확인해주세요.");

    private final HttpStatus httpStatus;
    private final String message;
    private final String solution;
}

