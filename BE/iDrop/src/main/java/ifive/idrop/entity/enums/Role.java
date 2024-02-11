package ifive.idrop.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {
    DRIVER("기사"),
    PARENT("부모");

    private final String name;
}
