package ifive.idrop.entity;

import ifive.idrop.dto.request.LoginRequest;
import ifive.idrop.entity.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@MappedSuperclass
public abstract class Users {
    private String userId;
    private String password;
    private String name;
    private String phoneNumber;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String refreshToken;
    private String fcmToken;

    public void setUserInfo(String userId, String password, String name, String phoneNumber, Role role){
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.role = role;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void updateFcmToken(String fcmToken) {
        this.fcmToken = fcmToken;
    }

    public boolean verifyUser(LoginRequest loginRequest) {
        return this.userId.equals(loginRequest.getUserId()) && this.password.equals(loginRequest.getPassword());
    }
}
