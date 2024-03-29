package ifive.idrop.websocket;

import ifive.idrop.jwt.JwtProvider;
import ifive.idrop.repository.UserRepository;
import ifive.idrop.websocket.direction.NaverDirectionFinder;
import ifive.idrop.websocket.location.LocationWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final PickUpInfoRepository pickUpInfoRepository;
    private final NaverDirectionFinder naverDirectionFinder;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(locationWebSocketHandler(), "/ws/location-tracking")
                .addInterceptors(webSocketHandShakeinterceptor())
                .setAllowedOrigins("*"); //TODO 일단 모든 경로 허용 추후 설정 변경
    }

    @Bean
    public LocationWebSocketHandler locationWebSocketHandler() {
        return new LocationWebSocketHandler(jwtProvider, userRepository, pickUpInfoRepository, naverDirectionFinder);
    }

    @Bean
    public WebSocketHandShakeInterceptor webSocketHandShakeinterceptor() {
        return new WebSocketHandShakeInterceptor(jwtProvider, userRepository);
    }
}
