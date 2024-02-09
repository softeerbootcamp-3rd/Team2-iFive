package ifive.idrop.dto;

import ifive.idrop.entity.enums.Role;
import ifive.idrop.exception.ErrorCode;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserVerifyResponseDto {
    private ErrorCode errorCode;
    private Role role;
}
