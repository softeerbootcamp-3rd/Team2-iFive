package ifive.idrop.controller;

import ifive.idrop.annotation.Login;
import ifive.idrop.dto.BaseResponse;
import ifive.idrop.dto.SubscribeRequest;
import ifive.idrop.entity.Parent;
import ifive.idrop.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/parent")
public class ParentController {
    private final ParentService parentService;

    @PostMapping("/subscribe")
    public BaseResponse<String> subscribeDriver(@Login Parent parent, @RequestBody SubscribeRequest request) {
        return parentService.createSubscribe(parent, request);
    }
}
