package ifive.idrop.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifive.idrop.dto.request.LoginRequest;
import ifive.idrop.entity.enums.Role;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorResponse;
import ifive.idrop.service.UserService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class VerifyUserFilter implements Filter {
    public static final String AUTHENTICATE_USER = "authenticateUser";
    public static final String FCM_TOKE  = "fcmToken";
    private final ObjectMapper objectMapper;
    private final UserService userService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        if ((httpServletRequest.getMethod().equals("POST"))) {
            try {
                LoginRequest loginRequest = objectMapper.readValue(request.getReader(), LoginRequest.class);
                Role role = userService.verifyUser(loginRequest);
                request.setAttribute(AUTHENTICATE_USER, new AuthenticateUser(loginRequest.getUserId(), role));
                request.setAttribute(FCM_TOKE, loginRequest.getFcmToken());
                chain.doFilter(request, response);
            } catch (CommonException e) {
                log.error("user verify failed");
                httpServletResponseError((HttpServletResponse) response, e);
            }
        }
    }

    private void httpServletResponseError(HttpServletResponse httpServletResponse, CommonException e) throws IOException {
        httpServletResponse.setStatus(e.getHttpStatus().value());
        httpServletResponse.setContentType("application/json");
        httpServletResponse.setCharacterEncoding("utf-8");
        String json = objectMapper.writeValueAsString(ErrorResponse.from(e));
        httpServletResponse.getWriter().write(json);
    }
}
