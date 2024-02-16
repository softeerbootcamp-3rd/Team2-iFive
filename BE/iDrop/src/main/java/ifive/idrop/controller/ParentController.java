package ifive.idrop.controller;

import ifive.idrop.annotation.Login;
import ifive.idrop.dto.BaseResponse;
import ifive.idrop.dto.SubscribeRequest;
import ifive.idrop.entity.Parent;
import ifive.idrop.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/parent")
public class ParentController {
    private final ParentService parentService;

    @PostMapping("/subscribe")
    public BaseResponse<String> subscribeDriver(@Login Parent parent, @RequestBody SubscribeRequest request) throws JSONException {
        return parentService.createSubscribe(parent, request);
    }

    @GetMapping("/pickup/now")
    public BaseResponse checkPickUpInfo(@Login Parent parent) {
        return parentService.getChildRunningInfo(parent);
    }
}
