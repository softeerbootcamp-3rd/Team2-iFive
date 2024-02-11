package ifive.idrop.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(locationWebSocketHandler(), "/ws/location-tracking")
                .setAllowedOrigins("*"); //TODO 일단 모든 경로 허용 추후 설정 변경
    }

    @Bean
    public LocationWebSocketHandler locationWebSocketHandler() {
        return new LocationWebSocketHandler();
    }
}
