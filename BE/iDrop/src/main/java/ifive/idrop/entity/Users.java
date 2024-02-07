package ifive.idrop.entity;

import ifive.idrop.dto.UserLoginDto;
import ifive.idrop.entity.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
public abstract class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_id")
    private Long id;

    private String userId;
    private String password;
    private String name;
    private String phone;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String refreshToken;

    public void setUserInfo(String userId, String password, String name, String phone, Role role){
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.role = role;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public boolean verifyUser(UserLoginDto userLoginDto) {
        return this.userId.equals(userLoginDto.getUserId()) && this.password.equals(userLoginDto.getPassword());
    }
}
