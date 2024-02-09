package ifive.idrop.filter;

import ifive.idrop.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticateUser {
    private String userId;
    private Role role;
}
