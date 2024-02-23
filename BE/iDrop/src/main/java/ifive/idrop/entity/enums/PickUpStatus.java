package ifive.idrop.entity.enums;

public enum PickUpStatus {
    WAIT("대기"),
    CANCEL("취소"),
    ACCEPT("승인"),
    DECLINE("거절");

    private final String status;

    PickUpStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
