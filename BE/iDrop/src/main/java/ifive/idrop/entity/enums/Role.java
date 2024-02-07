package ifive.idrop.entity.enums;

public enum Role {
    DRIVER("기사"),
    PARENT("부모");

    private final String role;

    Role(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
