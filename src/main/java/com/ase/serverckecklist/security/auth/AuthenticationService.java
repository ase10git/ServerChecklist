package com.ase.serverckecklist.security.auth;

import com.ase.serverckecklist.dto.UserDto;
import com.ase.serverckecklist.entity.User;
import com.ase.serverckecklist.entity.Verification;
import com.ase.serverckecklist.repository.UserRepository;
import com.ase.serverckecklist.repository.VerificationRepository;
import com.ase.serverckecklist.security.config.JwtService;
import com.ase.serverckecklist.security.config.RandomString;
import com.ase.serverckecklist.security.config.SecurityProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {
    // DB와 상호작용하는 사용자 repository
    private final UserRepository userRepository;
    // 인증 코드 repository
    private final VerificationRepository verificationRepository;
    // 비밀번호 인코더
    private final PasswordEncoder passwordEncoder;
    // jwt 서비스
    private final JwtService jwtService;
    // 사용자 신원 확인
    private final AuthenticationManager authenticationManager;
    // Security 설정
    private final SecurityProperties securityProperties;

    // 회원가입
    public AuthenticationResponse register(UserDto dto) {
        // 요청으로부터 온 데이터로 사용자 객체 생성
        User user = dto.toEntity();
        // 비밀번호 인코딩
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        // 권한 설정 - 일반 사용자
        user.setRoles(new String[]{"USER"});

        if (user.getId() != null) { // 중복id 존재 시 데이터 추가 x
            return null;
        }

        // -----테스트용
        // 이메일 인증 완료
        user.setVerification(true);

        // 사용자 저장
        userRepository.save(user);

        // 이메일 인증 정보 생성 및 DB 저장
        //saveVerification(user.getEmail());

        // 인증 응답 객체 생성
        return AuthenticationResponse.builder()
                .token("succeed")
                .build();
    }

    // 로그인
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // 요청으로 들어온 사용자의 신원 확인
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        // 위의 인증을 거친 사용자를 DB에 검색
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        
        // 사용자가 인증 안됬거나, 만료됬거나, 잠겼거나, 사용 불가면 토큰 발행 금지
        if (!user.isVerified() || !user.isAccountNonExpired() 
                || !user.isAccountNonLocked() || !user.isEnabled()) {
            return null;
        }
        
        // 토큰 생성 - 사용자 정보로 생성
        var jwtToken = jwtService.generateToken(user);
        // 인증 응답 객체 생성
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    // 이메일 인증용 코드 생성
    public Verification saveVerification(String email) {
        // 인증용 정보 객체
        Verification verification = new Verification();

        // 코드 생성
        String code = new RandomString(securityProperties).getCode();

        // 인증용 객체에 이메일과 코드 저장
        verification.setEmail(email);
        verification.setCode(code);

        // DB에 저장
        verificationRepository.save(verification);

        return verification;
    }

    // 이메일 인증
    public VerificationResponse verifyEmail(VerificationRequest request) {
        // 인증 결과 전송용 객체
        VerificationResponse response = new VerificationResponse();

        // 해당 이메일의 사용자 조회
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        // 사용자가 이미 인증된 상태면 절차 취소
        if (user.isVerified()) {
            response.setVerified(false);
            response.setResult("User is already verified");
            return response;
        }

        // DB에 저장된 이메일과 코드하고 비교
        Verification verification = verificationRepository.findByEmail(request.getEmail());

        // DB에 저장된 인증 코드가 없거나 만료되었다면 인증 절차 취소
        if (verification == null || verification.isCodeExpired()) {
            response.setVerified(false);
            response.setResult("Verification failed");
            return response;
        }

        // 사용자 객체에 verification = true 설정
        user.setVerification(true);

        // db에 저장
        userRepository.save(user);
        response.setVerified(true);
        response.setResult("Verification success");
        return response;
    }
}
