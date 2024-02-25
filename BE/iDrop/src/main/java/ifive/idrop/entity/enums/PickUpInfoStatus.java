package ifive.idrop.entity.enums;

public enum PickUpInfoStatus {
    START("픽업 시작"),
    DONE("픽업 종료");

    private final String status;

    PickUpInfoStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}