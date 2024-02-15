package ifive.idrop.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import ifive.idrop.entity.Users;
import ifive.idrop.filter.AuthenticateUser;
import ifive.idrop.filter.VerifyUserFilter;
import ifive.idrop.jwt.JwtProvider;
import ifive.idrop.repository.UserRepository;
import ifive.idrop.util.CustomObjectMapper;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class WebSocketHandShakeInterceptor implements HandshakeInterceptor {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        String accessToken = request.getHeaders().getFirst("Sec-WebSocket-Protocol");
        String subProtocol = new String(accessToken);
        response.getHeaders().set("Sec-WebSocket-Protocol", subProtocol);

        AuthenticateUser authenticateUser = getAuthenticateUser(accessToken);
        Optional<Users> user = userRepository.findByUserId(authenticateUser.getUserId());
        if (user.isEmpty()) {
            return false;
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }

    private AuthenticateUser getAuthenticateUser(String token) throws JsonProcessingException {
        Claims claims = jwtProvider.getClaims(token);
        String authenticateUserJson = claims.get(VerifyUserFilter.AUTHENTICATE_USER, String.class);
        return CustomObjectMapper.getMapper().readValue(authenticateUserJson, AuthenticateUser.class);
    }
}