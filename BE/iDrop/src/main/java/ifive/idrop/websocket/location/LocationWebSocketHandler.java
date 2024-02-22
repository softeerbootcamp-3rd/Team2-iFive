package ifive.idrop.websocket.location;

import com.fasterxml.jackson.core.JsonProcessingException;
import ifive.idrop.entity.*;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.filter.AuthenticateUser;
import ifive.idrop.filter.VerifyUserFilter;
import ifive.idrop.jwt.JwtProvider;
import ifive.idrop.repository.UserRepository;
import ifive.idrop.util.CustomObjectMapper;
import ifive.idrop.websocket.PickUpInfoRepository;
import ifive.idrop.websocket.location.dto.ChildGeoLocation;
import ifive.idrop.websocket.location.dto.CurrentPickUp;
import ifive.idrop.websocket.direction.dto.Direction;
import ifive.idrop.websocket.direction.NaverDirectionFinder;
import ifive.idrop.websocket.location.dto.DriverGeoLocation;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static ifive.idrop.entity.enums.Role.*;

@Slf4j
@RequiredArgsConstructor
public class LocationWebSocketHandler extends TextWebSocketHandler {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final PickUpInfoRepository pickUpInfoRepository;
    private final NaverDirectionFinder directionFinder;

    private static final Map<String, WebSocketSession> sessions; //세션아이디, 세션
    private static final Map<String, Long> drivers;  //기사 세션아이디, 기사 id
    private static final Map<Long, String> parents; //부모 id, 부모 세션아이디

    private static final Map<Long, CurrentPickUp> currentPickUps; //기사 id, 현재픽업(child id, parent id, reserved time)

    static {
        sessions = new ConcurrentHashMap<>();
        drivers = new ConcurrentHashMap<>();
        parents = new ConcurrentHashMap<>();
        currentPickUps = new ConcurrentHashMap<>();
    }


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String sessionId = session.getId();
        sessions.put(sessionId, session);

        Users user = getUserBySession(session);

        if (user.getRole() == DRIVER) {
            Long driverId = ((Driver) user).getId();
            drivers.put(sessionId, driverId);

            try {
                CurrentPickUp currentPickUp = setCurrentPickUps(driverId);
                Direction direction = directionFinder.getDirection(currentPickUp.getStartLocation(), currentPickUp.getEndLocation());
                session.sendMessage(new TextMessage(CustomObjectMapper.getString(direction)));
            } catch (CommonException e) {
                sendErrorMessage(session, e.getMessage());
                session.close(CloseStatus.NORMAL); // 정상 종료 상태로 소켓 연결 종료
                return; // 메소드 종료
            }

            log.info("webSocket/location - DRIVER connected (session ID={}, driver ID={})", sessionId, driverId);

        } else if (user.getRole() == PARENT) {
            Long parentId = ((Parent) user).getId();
            parents.put(parentId, sessionId);

            log.info("webSocket/location - PARENT connected (session ID={}, parent ID={})", sessionId, parentId);
        }

    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws Exception {
        String sessionId = session.getId();
        Long driverId = drivers.get(sessionId);

        DriverGeoLocation driverLocation = CustomObjectMapper.getObject(textMessage.getPayload(), DriverGeoLocation.class);
        CurrentPickUp currentPickUp = currentPickUps.get(driverId);

        sendChildLocationToParent(currentPickUp, driverLocation);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String sessionId = session.getId();
        sessions.remove(sessionId);
        if (drivers.containsKey(sessionId)) {
            removeSessionData(sessionId);
        }
    }

    private void sendErrorMessage(WebSocketSession session, String message) throws IOException {
        // 사용자 정의 오류 메시지 전송
        session.sendMessage(new TextMessage(message));
    }

    //엑세스 토큰으로 userId, role 구하기
    private AuthenticateUser getAuthenticateUser(String token) throws JsonProcessingException {
        Claims claims = jwtProvider.getClaims(token);
        String authenticateUserJson = claims.get(VerifyUserFilter.AUTHENTICATE_USER, String.class);
        return CustomObjectMapper.getMapper().readValue(authenticateUserJson, AuthenticateUser.class);
    }

    //웹소켓 세션에서 User 구하기
    private Users getUserBySession(WebSocketSession session) throws JsonProcessingException {
        // HTTP 헤더에서 엑세스 토큰을 꺼낸다.

        String accessToken = String.valueOf(session.getHandshakeHeaders().get("Sec-Websocket-Protocol"));
        accessToken = accessToken.substring(1,accessToken.length()-1);
        AuthenticateUser authenticateUser = getAuthenticateUser(accessToken);
        return userRepository.findByUserId(authenticateUser.getUserId())
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
    }

    //웹소켓 driver가 연결 시 currentPickUp 만들어서 세팅
    private CurrentPickUp setCurrentPickUps(Long driverId) {
        PickUp pickup = pickUpInfoRepository.findPickUpByDriverIdWithCurrentTimeInReservedWindow(driverId)
                .orElseThrow(() -> new CommonException(ErrorCode.PICKUP_NOT_FOUND));
        PickUpLocation pickUpLocation = pickUpInfoRepository.getPickUpLocation(pickup.getId());

        Object[] childIdAndParentId = pickUpInfoRepository.findChildAndParentIdByPickUp(pickup.getId());
        CurrentPickUp currentPickUp = CurrentPickUp.builder()
                .childId((Long) childIdAndParentId[0])
                .parentId((Long) childIdAndParentId[1])
                .reservedTime(pickup.getReservedTime())
                .startLocation(directionFinder.getStartLocationForApi(pickUpLocation))
                .endLocation(directionFinder.getEndLocationForApi(pickUpLocation))
                .build();
        currentPickUps.put(driverId, currentPickUp);
        return  currentPickUp;
    }

    //웹소켓 연결 종료 시, 관련 데이터 각종 hashmap에서 삭제
    private void removeSessionData(String sessionId) {
        Long driverId = drivers.get(sessionId);
        CurrentPickUp currentPickUp = currentPickUps.get(driverId);
        Long parentId = currentPickUp.getParentId();
        drivers.remove(sessionId);
        currentPickUps.remove(driverId);
        parents.remove(parentId);
    }

    private void sendChildLocationToParent(CurrentPickUp currentPickUp, DriverGeoLocation driverLocation) throws Exception {
        Long parentId = currentPickUp.getParentId();
        try {
            WebSocketSession receiver = sessions.get(parents.get(parentId));
            if (receiver != null && receiver.isOpen()) {
                ChildGeoLocation childLocation = new ChildGeoLocation(driverLocation, currentPickUp.getChildId());
                receiver.sendMessage(new TextMessage(CustomObjectMapper.getString(childLocation)));
            }
        } catch (Exception e) { //driver는 정보를 보내는데 부모가 접속중이 아닌경우
            ;
        }

    }
}
