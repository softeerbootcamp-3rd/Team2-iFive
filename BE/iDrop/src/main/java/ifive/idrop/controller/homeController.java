package ifive.idrop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class homeController {
    @GetMapping("/")
    public String home() {
        return "runngin-server";
    }
}
