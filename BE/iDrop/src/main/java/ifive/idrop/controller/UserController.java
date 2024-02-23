package ifive.idrop.controller;

import ifive.idrop.annotation.Login;
import ifive.idrop.dto.response.BaseResponse;
import ifive.idrop.dto.response.NameResponse;
import ifive.idrop.dto.request.SignUpRequest;
import ifive.idrop.entity.Users;
import ifive.idrop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public BaseResponse<String> signUp(@RequestBody SignUpRequest signUpRequest) {
        return userService.signUp(signUpRequest);
    }

    @GetMapping("/name")
    public NameResponse getName(@Login Users user) {
        return userService.getName(user);
    }
}
