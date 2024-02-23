package ifive.idrop.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CommonException extends RuntimeException {
    private final HttpStatus httpStatus;
    private final String message;
    private final String solution;

    public CommonException(HttpStatus httpStatus, String message, String solution){
        this.httpStatus = httpStatus;
        this.message = message;
        this.solution = solution;
    }

    public CommonException(ErrorCode errorCode){
        this.httpStatus = errorCode.getHttpStatus();
        this.message = errorCode.getMessage();
        this.solution = errorCode.getSolution();
    }
}
