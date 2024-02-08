package ifive.idrop.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifive.idrop.dto.BaseResponse;
import ifive.idrop.dto.UserLoginDto;
import ifive.idrop.dto.UserRegisterDto;
import ifive.idrop.entity.Users;
import ifive.idrop.jwt.Jwt;
import ifive.idrop.jwt.JwtProvider;
import ifive.idrop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Transactional
    public BaseResponse<String> registerUser(UserRegisterDto userRegisterDto){
        Users user = userRegisterDto.toEntity();
        userRepository.save(user);
        return BaseResponse.of("성공적으로 회원가입 되었습니다.", user.getRole().getRole());
    }

//    public void checkDuplicateUserId(String userId) {
//        Users user = userRepository.findByUserId(userId);
//        if (user != null)
//            throw new RuntimeException();
//    }

//    public UserVerifyResponseDto verifyUser(UserLoginDto userLoginDto){
//        Users user = userRepository.findByUserId(userLoginDto.getUserId());
//        if (user == null)
//            return UserVerifyResponseDto.builder()
//                    .isValid(false)
//                    .build();
//        return UserVerifyResponseDto.builder()
//                .isValid(true)
//                .userRole(user.getUserRoles().stream().map(UserRole::getRole).collect(Collectors.toSet())).build();
//    }
//
//    public UserResponseDto findUserByEmail(String userEmail){
//        return new UserResponseDto(userRepository.findByUserEmail(userEmail));
//    }
//
//    @Transactional
//    public void updateRefreshToken(String userId, String refreshToken){
//        Users user = userRepository.findByUserId(userId);
//        if(user == null)
//            return;
//        user.updateRefreshToken(refreshToken);
//    }
//
//    @Transactional
//    public Jwt refreshToken(String refreshToken){
//        try{
//            // 유효한 토큰 인지 검증
//            jwtProvider.getClaims(refreshToken);
//            Users user = userRepository.findByRefreshToken(refreshToken);
//            if(user == null)
//                return null;
//
//            HashMap<String, Object> claims = new HashMap<>();
//            AuthenticateUser authenticateUser = new AuthenticateUser(user.getUserEmail(),
//                    user.getUserRoles().stream().map(UserRole::getRole).collect(Collectors.toSet()));
//            String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);
//            claims.put(VerifyUserFilter.AUTHENTICATE_USER,authenticateUserJson);
//            Jwt jwt = jwtProvider.createJwt(claims);
//            updateRefreshToken(user.getUserId(),jwt.getRefreshToken());
//            return jwt;
//        } catch (Exception e){
//            return null;
//        }
//    }
}
