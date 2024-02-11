package ifive.idrop.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public class BaseResponse<T> {
    private String message;
    private T data;

    private BaseResponse(String message) {
        this.message = message;
    }
    public static BaseResponse<?> from(String message) {
        return new BaseResponse<>(message);
    }

    public static <T> BaseResponse<T> of (String message, T data) {
        return new BaseResponse<T>(message, data);
    }
}
