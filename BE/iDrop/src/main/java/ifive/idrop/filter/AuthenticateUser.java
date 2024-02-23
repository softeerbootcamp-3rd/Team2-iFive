package ifive.idrop.filter;

import ifive.idrop.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticateUser {
    private String userId;
    private Role role;
}
