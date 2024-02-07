package ifive.idrop.dto;

import ifive.idrop.entity.Driver;
import ifive.idrop.entity.Parent;
import ifive.idrop.entity.Users;
import ifive.idrop.entity.enums.Role;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserRegisterDto {
    private String userId;
    private String password;
    private String name;
    private String phone;
    private String role;

    public Users toEntity(){
        if ("기사".equals(role)) {
            Driver driver = new Driver();
            driver.setUserInfo(userId, password, name, phone, Role.DRIVER);
            return driver;
        } else if ("부모".equals(role)) {
            Parent parent = new Parent();
            parent.setUserInfo(userId, password, name, phone, Role.PARENT);
            return parent;
        } else
            throw new CommonException(ErrorCode.INVALID_ROLE_OF_USER);
    }
}
