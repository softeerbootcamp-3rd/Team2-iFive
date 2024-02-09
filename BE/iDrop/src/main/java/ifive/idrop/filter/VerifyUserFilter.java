package ifive.idrop.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifive.idrop.dto.UserLoginDto;
import ifive.idrop.dto.UserVerifyResponseDto;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorResponse;
import ifive.idrop.exception.GlobalExceptionHandler;
import ifive.idrop.service.UserService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class VerifyUserFilter implements Filter {
    public static final String AUTHENTICATE_USER = "authenticateUser";
    private final ObjectMapper objectMapper;
    private final UserService userService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        if ((httpServletRequest.getMethod().equals("POST"))) {
            try {
                UserLoginDto userLoginDto = objectMapper.readValue(request.getReader(), UserLoginDto.class);
                UserVerifyResponseDto verifyResponse = userService.verifyUser(userLoginDto);
                if (verifyResponse.getErrorCode() != null)
                    throw new CommonException(verifyResponse.getErrorCode());
                request.setAttribute(AUTHENTICATE_USER, new AuthenticateUser(userLoginDto.getUserId(), verifyResponse.getRole()));
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
