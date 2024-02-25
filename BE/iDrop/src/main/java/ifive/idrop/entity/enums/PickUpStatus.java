package ifive.idrop.entity.enums;

import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;

public enum PickUpStatus {
    //순서 수정하면 안됩니다.
    DECLINE("거절"), //기사가 요청을 거부한 상태
    ACCEPT("승인"), //기사가 요청을 수락한 상태
    WAIT("대기"), //부모가 요청을 보낸 상태
    CANCEL("취소"), //부모가 요청을 취소한 상태
    EXPIRED("만료"); //구독 기간이 끝나서 만료된 상태

    private static final PickUpStatus[] ENUMS = PickUpStatus.values();

    private final String status;

    PickUpStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public static PickUpStatus of(int statusCode) {
        if (statusCode < 0 || statusCode > 4) {
            throw new CommonException(ErrorCode.INVALID_PICKUP_STATUS);
        }
        return ENUMS[statusCode];
    }
}
