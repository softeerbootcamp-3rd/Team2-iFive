package ifive.idrop.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import ifive.idrop.entity.Child;
import ifive.idrop.entity.Parent;
import ifive.idrop.entity.Users;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class NameResponse {
    String role;
    String name;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    List<String> children;

    public NameResponse(Users user) {
        this.role = user.getRole().getName();
        this.name = user.getName();
        if (user instanceof Parent parent) {
            children = new ArrayList<>();
            List<Child> childList = parent.getChildList();
            for (Child child : childList) {
                children.add(child.getName());
            }
        }
    }
}
