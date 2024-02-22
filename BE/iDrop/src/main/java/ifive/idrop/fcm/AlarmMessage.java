package ifive.idrop.fcm;

import lombok.Getter;

@Getter
public enum AlarmMessage {
    APPROVE("승인 안내", "기사가 요청을 승인하였습니다"),
    DECLINE("거절 안내", "기사가 요청을 거절하였습니다"),
    PICK_UP_START("픽업 시작 안내", "기사가 픽업을 시작하였습니다"),
    PICK_UP_END("픽업 종료 안내", "기사가 픽업을 종료하였습니다"),
    SUBSCRIBE_REQUEST("구독 요청 안내", "구독 승인 요청이 왔습니다."),
    PICK_UP_PRE_INFO("픽업 알림 안내", "픽업 예정까지 한 시간 남았습니다.")
    ;

    private final String title;
    private final String message;

    AlarmMessage(String title, String message) {
        this.title = title;
        this.message = message;
    }
}
