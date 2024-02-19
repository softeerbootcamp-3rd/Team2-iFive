package ifive.idrop.entity.enums;

public enum PickUpInfoStatus {
    START("시작"),
    DONE("종료");

    private final String status;

    PickUpInfoStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
