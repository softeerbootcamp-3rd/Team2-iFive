package ifive.idrop.websocket.direction;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifive.idrop.util.CustomObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Slf4j
@Service
@RequiredArgsConstructor
public class NaverDirectionFinder {

    @Value("${naver_client_id}")
    private String clientId;

    @Value("${naver_client_secret}")
    private String clientSecret;

    private final RestTemplate restTemplate = new RestTemplate();

    public NaverDirectionResponse getDirection(String start, String goal) throws Exception {
        String url = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving";
        url += "?start=" + start + "&goal=" + goal;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-NCP-APIGW-API-KEY-ID", clientId);
        headers.set("X-NCP-APIGW-API-KEY", clientSecret);

        RequestEntity<Void> req = RequestEntity
                .get(url)
                .headers(headers)
                .build();

        ResponseEntity<String> result = restTemplate.exchange(req, String.class);

        NaverDirectionResponse response = CustomObjectMapper.getObject(result.getBody(), NaverDirectionResponse.class );
        Direction direction = new Direction(response.getPath());

        String directionString = CustomObjectMapper.getMapper().writeValueAsString(direction);

        log.info("DIRECTION {}", directionString);

        return response;
    }
}
