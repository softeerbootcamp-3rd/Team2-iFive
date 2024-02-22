package ifive.idrop.websocket.direction;

import ifive.idrop.entity.PickUpLocation;
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

    @Value("${naver_direction_url}")
    private String NAVER_DIRECTION_URL;

    @Value("${naver_client_id}")
    private String clientId;

    @Value("${naver_client_secret}")
    private String clientSecret;

    private final RestTemplate restTemplate = new RestTemplate();

    public Direction getDirection(String start, String goal) throws Exception {
        StringBuilder sb = new StringBuilder(NAVER_DIRECTION_URL);
        sb.append("?start=").append(start).append("&goal=").append(goal);
        String url = sb.toString();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-NCP-APIGW-API-KEY-ID", clientId);
        headers.set("X-NCP-APIGW-API-KEY", clientSecret);

        RequestEntity<Void> req = RequestEntity
                .get(url)
                .headers(headers)
                .build();

        NaverDirectionResponse response = restTemplate.exchange(req, NaverDirectionResponse.class).getBody();
        Direction direction = new Direction(response.getPath());
        return direction;
    }

    public String getStartLocationForApi(PickUpLocation pickUpLocation) {
        return pickUpLocation.getStartLongitude() + "," + pickUpLocation.getStartLatitude();
    }

    public String getEndLocationForApi(PickUpLocation pickUpLocation) {
        return pickUpLocation.getEndLongitude() + "," + pickUpLocation.getEndLatitude();
    }
}
