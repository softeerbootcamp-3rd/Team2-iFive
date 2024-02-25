package ifive.idrop.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifive.idrop.dto.request.TokenRequest;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorResponse;
import ifive.idrop.service.UserService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.PatternMatchUtils;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class FCMFilter implements Filter {
    private final String[] blackListUris = {"/menu"};
    private final ObjectMapper objectMapper;
    private final UserService userService;
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        if (isBlackList(httpServletRequest.getRequestURI()) && (httpServletRequest.getMethod().equals("POST"))) {
            try {
                String userId = (String) request.getAttribute(JwtAuthorizationFilter.USER_ID);
                TokenRequest tokenRequest = objectMapper.readValue(request.getReader(), TokenRequest.class);
                log.info("user = {}, fcmToken = {}", userId, tokenRequest.getFcmToken());
                userService.updateFCMToken(userId, tokenRequest.getFcmToken());
                String json = objectMapper.writeValueAsString("Data Successfully Proceed");
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json);
            } catch (CommonException e) {
                log.error("FCM token save fail");
                httpServletResponseError((HttpServletResponse) response, e);
            }
            return;
        }
        chain.doFilter(request, response);
    }

    private void httpServletResponseError(HttpServletResponse httpServletResponse, CommonException e) throws IOException {
        httpServletResponse.setStatus(e.getHttpStatus().value());
        httpServletResponse.setContentType("application/json");
        httpServletResponse.setCharacterEncoding("utf-8");
        String json = objectMapper.writeValueAsString(ErrorResponse.from(e));
        httpServletResponse.getWriter().write(json);
    }

    private boolean isBlackList(String uri){
        return PatternMatchUtils.simpleMatch(blackListUris, uri);
    }
}
