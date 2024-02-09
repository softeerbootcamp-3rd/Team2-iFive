package ifive.idrop.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifive.idrop.dto.BaseResponse;
import ifive.idrop.dto.UserLoginDto;
import ifive.idrop.dto.UserRegisterDto;
import ifive.idrop.dto.UserVerifyResponseDto;
import ifive.idrop.entity.Users;
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

import java.util.HashMap;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Transactional
    public BaseResponse<String> registerUser(UserRegisterDto userRegisterDto){
        checkDuplicateUserId(userRegisterDto.getUserId());
        Users user = userRegisterDto.toEntity();
        userRepository.save(user);
        return BaseResponse.of("성공적으로 회원가입 되었습니다.", user.getRole().getRole());
    }

    public void checkDuplicateUserId(String userId) {
        Optional<Users> optional = userRepository.findByUserId(userId);
        if (optional.isPresent())
            throw new CommonException(ErrorCode.DUPLICATE_USERID);
    }

    public UserVerifyResponseDto verifyUser(UserLoginDto userLoginDto){
        Optional<Users> optional = userRepository.findByUserId(userLoginDto.getUserId());
        if (optional.isEmpty())
            return UserVerifyResponseDto.builder()
                    .errorCode(ErrorCode.USERID_NOT_EXIST)
                    .build();
        Users user = optional.get();
        if (!user.getPassword().equals(userLoginDto.getPassword()))
            return UserVerifyResponseDto.builder()
                    .errorCode(ErrorCode.PASSWORD_NOT_MATCHED)
                    .build();

        return UserVerifyResponseDto.builder()
                .role(user.getRole())
                .build();
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
    public Jwt refreshToken(String refreshToken){
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
}
