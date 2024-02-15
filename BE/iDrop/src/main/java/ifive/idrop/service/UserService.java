package ifive.idrop.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifive.idrop.annotation.Login;
import ifive.idrop.dto.BaseResponse;
import ifive.idrop.dto.LoginRequest;
import ifive.idrop.dto.NameResponse;
import ifive.idrop.dto.SignUpRequest;
import ifive.idrop.entity.Child;
import ifive.idrop.entity.Parent;
import ifive.idrop.entity.Users;
import ifive.idrop.entity.enums.Role;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.filter.AuthenticateUser;
import ifive.idrop.filter.VerifyUserFilter;
import ifive.idrop.jwt.Jwt;
import ifive.idrop.jwt.JwtProvider;
import ifive.idrop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Transactional
    public BaseResponse<String> signUp(SignUpRequest signUpRequest){
        checkDuplicateUserId(signUpRequest.getUserId());
        Users user = signUpRequest.toEntity();
        userRepository.save(user);
        return BaseResponse.of("성공적으로 회원가입 되었습니다.", user.getRole().getName());
    }

    public void checkDuplicateUserId(String userId) {
        Optional<Users> optional = userRepository.findByUserId(userId);
        if (optional.isPresent())
            throw new CommonException(ErrorCode.DUPLICATE_USERID);
    }

    public Role verifyUser(LoginRequest loginRequest){
        Optional<Users> optional = userRepository.findByUserId(loginRequest.getUserId());
        Users user = optional.orElseThrow(() -> new CommonException(ErrorCode.USERID_NOT_EXIST));
        if (!user.verifyUser(loginRequest))
            throw new CommonException(ErrorCode.PASSWORD_NOT_MATCHED);
        return user.getRole();
    }

    @Transactional
    public void updateRefreshToken(String userId, String refreshToken){
        Optional<Users> optional = userRepository.findByUserId(userId);
        if (optional.isEmpty())
            return;
        Users user = optional.get();
        user.updateRefreshToken(refreshToken);
    }


    @Transactional
    public Jwt createNewJwtFromRefreshToken(String refreshToken) {
        try{
            // 유효한 토큰 인지 검증
            jwtProvider.getClaims(refreshToken);
            Optional<Users> optional = userRepository.findByRefreshToken(refreshToken);
            if (optional.isEmpty())
                return null;
            Users user = optional.get();

            HashMap<String, Object> claims = new HashMap<>();
            AuthenticateUser authenticateUser = new AuthenticateUser(user.getUserId(), user.getRole());
            String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);
            claims.put(VerifyUserFilter.AUTHENTICATE_USER, authenticateUserJson);
            Jwt jwt = jwtProvider.createJwt(claims);
            updateRefreshToken(user.getUserId(),jwt.getRefreshToken());
            return jwt;
        } catch (Exception e){
            return null;
        }
    }

    @Transactional(readOnly = true)
    public NameResponse getName(Users user) {
        Users foundUser = userRepository.findByUserId(user.getUserId())
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
        return new NameResponse(foundUser);
    }
}
