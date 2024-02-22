package ifive.idrop.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class NotificationRequest {
    private String title;
    private String message;
    private String token;
}