package ifive.idrop.exception;

import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = CommonException.class)
    public ResponseEntity<?> handle(CommonException e) {
        return ResponseEntity.status(e.getHttpStatus())
                .body(ErrorResponse.from(e));
    }

    @Getter
    static class ErrorResponse {
        private String message;
        private String solution;

        public static ErrorResponse from(CommonException e) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.message = e.getMessage();
            errorResponse.solution = e.getSolution();
            return errorResponse;
        }
    }
}