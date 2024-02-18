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
    USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "회원 조회 시 해당 회원을 찾을 수 없습니다.", "존재하지 않는 회원이므로 로그인 정보를 다시 확인해 주세요."),
    INVALID_ROLE_OF_USER(HttpStatus.BAD_REQUEST, "회원의 역할이 정확하지 않습니다.", "역할은 '기사' 또는 '부모' 중 하나여야 합니다."),
    DUPLICATE_USERID(HttpStatus.BAD_REQUEST, "이미 존재하는 아이디입니다.", "다른 아이디를 입력해주세요."),
    USERID_NOT_EXIST(HttpStatus.BAD_REQUEST, "존재하지 않는 아이디입니다.", "아이디를 다시 확인해주세요."),
    DRIVER_NOT_EXIST(HttpStatus.BAD_REQUEST, "존재하지 기사입니다.", "기사 정보를 다시 확인해주세요."),
    CHILD_NOT_EXIST(HttpStatus.BAD_REQUEST, "등록되지 않은 아이입니다.", "아이 정보를 등록해주세요."),
    ALL_CHILD_NOT_EXIST(HttpStatus.BAD_REQUEST, "아이 정보가 없습니다", "아이 정보를 등록해주세요."),
    PASSWORD_NOT_MATCHED(HttpStatus.BAD_REQUEST, "비밀번호가 맞지 않습니다.", "비밀번호를 다시 확인해주세요."),
    INVALID_GENDER(HttpStatus.BAD_REQUEST, "성별이 정확하지 않습니다.", "성별은 '남성' 또는 '여성' 중 하나여야 합니다."),
    INVALID_DAY_OF_WEEK(HttpStatus.BAD_REQUEST, "요일이 정확하지 않습니다.", "요일은 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' 중 하나입니다."),
    CURRENT_PICKUP_NOT_FOUND(HttpStatus.NOT_FOUND, "현재 업무 시간인 픽업이 없습니다.", "업무 시간에 위치추적을 시작해주세요"),
    PICKUP_NOT_FOUND(HttpStatus.NOT_FOUND, "픽업이 없습니다.", "픽업 id를 다시 확인해주세요")
    ;
    private final HttpStatus httpStatus;
    private final String message;
    private final String solution;
}

