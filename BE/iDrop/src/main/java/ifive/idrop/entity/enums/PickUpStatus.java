package ifive.idrop.entity.enums;

public enum PickUpStatus {
    WAIT("대기"), //부모가 요청을 보낸 상태
    CANCEL("취소"), //부모가 요청을 취소한 상태
    ACCEPT("승인"), //기사가 요청을 수락한 상태
    DECLINE("거절"), //기사가 요청을 거부한 상태
    EXPIRED("만료"); //구독 기간이 끝나서 만료된 상태

    private final String status;

    PickUpStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
