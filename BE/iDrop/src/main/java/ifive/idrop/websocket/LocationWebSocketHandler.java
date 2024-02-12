package ifive.idrop.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ifive.idrop.annotation.Login;
import ifive.idrop.entity.Driver;
import ifive.idrop.entity.Parent;
import ifive.idrop.entity.Users;
import ifive.idrop.entity.enums.Role;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.filter.AuthenticateUser;
import ifive.idrop.filter.VerifyUserFilter;
import ifive.idrop.jwt.JwtProvider;
import ifive.idrop.repository.UserRepository;
import ifive.idrop.resolver.LoginUsersArgumentResolver;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public class LocationWebSocketHandler  extends TextWebSocketHandler {

    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;

    private final Map<String, WebSocketSession> sessions; //세션아이디, 세션
    private final Map<String, Role> roles; //세션아이디, role
    private final Map<String, Driver> drivers;  //세션아이디, 기사
    private final Map<Long, String> parents; //부모id, 부모 세션아이디

    public LocationWebSocketHandler(JwtProvider jwtProvider, ObjectMapper objectMapper, UserRepository userRepository) {
        this.jwtProvider = jwtProvider;
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;

        this.sessions = new ConcurrentHashMap<>();
        this.roles = new ConcurrentHashMap<>();
        this.drivers = new ConcurrentHashMap<>();
        this.parents = new ConcurrentHashMap<>();
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String sessionId = session.getId();
        log.info("web socket connected {}", session.getId());
        sessions.put(sessionId, session);

        // HTTP 헤더에서 엑세스 토큰을 꺼낸다.
        String accessToken = String.valueOf(session.getHandshakeHeaders().get("authorization")).substring("Bearer ".length()+1);
        AuthenticateUser authenticateUser = getAuthenticateUser(accessToken);
        Users users = userRepository.findByUserId(authenticateUser.getUserId())
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
        roles.put(sessionId, users.getRole());

        if (users.getRole() == Role.DRIVER) {
            drivers.put(sessionId, (Driver) users);
        } else if (users.getRole() == Role.PARENT) {
            Parent p = (Parent) users;
            parents.put(p.getId(), sessionId);
        }

    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
    }

    //엑세스 토큰으로 userId, role 구하기
    private AuthenticateUser getAuthenticateUser(String token) throws JsonProcessingException {
        Claims claims = jwtProvider.getClaims(token);
        String authenticateUserJson = claims.get(VerifyUserFilter.AUTHENTICATE_USER, String.class);
        return objectMapper.readValue(authenticateUserJson, AuthenticateUser.class);
    }
}
