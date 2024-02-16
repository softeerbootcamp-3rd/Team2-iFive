package ifive.idrop.controller;

import ifive.idrop.dto.BaseResponse;
import ifive.idrop.dto.SignUpRequest;
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
}
