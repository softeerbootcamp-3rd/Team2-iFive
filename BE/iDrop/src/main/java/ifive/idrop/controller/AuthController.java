package ifive.idrop.controller;

import ifive.idrop.dto.TokenRefreshRequest;
import ifive.idrop.jwt.Jwt;
import ifive.idrop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    @PostMapping("/refresh/token")
    public ResponseEntity<Jwt> tokenRefresh(@RequestBody TokenRefreshRequest tokenRefreshRequest) {
        Jwt newlyCreatedJwt = userService.createNewJwtFromRefreshToken(tokenRefreshRequest.getRefreshToken());
        if (newlyCreatedJwt == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(null);
        }
        return ResponseEntity.ok(newlyCreatedJwt);
    }
}
