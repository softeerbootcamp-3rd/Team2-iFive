package ifive.idrop.resolver;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ifive.idrop.annotation.Login;
import ifive.idrop.entity.Users;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.filter.AuthenticateUser;
import ifive.idrop.filter.VerifyUserFilter;
import ifive.idrop.jwt.JwtProvider;
import ifive.idrop.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.Optional;

@RequiredArgsConstructor
public class LoginUsersArgumentResolver implements HandlerMethodArgumentResolver {
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean hasLoginAnnotation = parameter.hasParameterAnnotation(Login.class);
        boolean hasUsersType = Users.class.isAssignableFrom(parameter.getParameterType());
        return hasLoginAnnotation && hasUsersType;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest httpServletRequest = (HttpServletRequest) webRequest.getNativeRequest();
        String token = getToken(httpServletRequest);
        AuthenticateUser authenticateUser = getAuthenticateUser(token);
        Optional<Users> optional = userRepository.findByUserId(authenticateUser.getUserId());
        Users users = optional.orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
        return users;
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
}
