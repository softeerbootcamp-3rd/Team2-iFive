package ifive.idrop.filter;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ifive.idrop.entity.enums.Role;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.exception.ErrorResponse;
import ifive.idrop.jwt.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.util.PatternMatchUtils;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter implements Filter {
    private final String[] whiteListUris = {"/user/signup", "/user/login", "/auth/refresh/token", "/ws/**"};
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        if (whiteListCheck(httpServletRequest.getRequestURI())){
            chain.doFilter(request, response);
            return;
        }
        if (!isContainToken(httpServletRequest)){
            log.error("access token doesn't exist");
            httpServletResponseError(httpServletResponse, new CommonException(ErrorCode.TOKEN_NOT_EXIST));
            return;
        }
        try {
            String token = getToken(httpServletRequest);
            AuthenticateUser authenticateUser = getAuthenticateUser(token);
            verifyAuthorization(httpServletRequest.getRequestURI(), authenticateUser);
            log.info("userId : {}", authenticateUser.getUserId());
            chain.doFilter(request, response);
        } catch (JsonParseException e){
            log.error("JsonParseException");
            httpServletResponse.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value());
        } catch (SignatureException | MalformedJwtException | UnsupportedJwtException e){
            log.error("invalid token");
            httpServletResponseError(httpServletResponse, new CommonException(ErrorCode.INVALID_TOKEN));
        } catch (ExpiredJwtException e){
            log.error("access token expired");
            httpServletResponseError(httpServletResponse, new CommonException(ErrorCode.ACCESS_TOKEN_EXPIRED));
        } catch (CommonException e){
            log.error("unauthorized user");
            httpServletResponseError(httpServletResponse, e);
        }
    }

    private boolean whiteListCheck(String uri){
        return PatternMatchUtils.simpleMatch(whiteListUris, uri);
    }

    private boolean isContainToken(HttpServletRequest request){
        String authorization = request.getHeader("Authorization");
        return authorization != null && authorization.startsWith("Bearer ");
    }

    private String getToken(HttpServletRequest request){
        String authorization = request.getHeader("Authorization");
        return authorization.substring(7);
    }

    private AuthenticateUser getAuthenticateUser(String token) throws JsonProcessingException {
        Claims claims = jwtProvider.getClaims(token);
        String authenticateUserJson = claims.get(VerifyUserFilter.AUTHENTICATE_USER, String.class);
        return objectMapper.readValue(authenticateUserJson, AuthenticateUser.class);
    }

    private void verifyAuthorization(String uri, AuthenticateUser user) {
        if (PatternMatchUtils.simpleMatch("*/driver*",uri) && !user.getRole().equals(Role.DRIVER)){
            throw new CommonException(ErrorCode.UNAUTHORIZED_USER);
        }
        if (PatternMatchUtils.simpleMatch("*/parent*",uri) && !user.getRole().equals(Role.PARENT)){
            throw new CommonException(ErrorCode.UNAUTHORIZED_USER);
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
