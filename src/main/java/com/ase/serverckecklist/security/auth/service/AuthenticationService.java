package com.ase.serverckecklist.security.auth.service;

import com.ase.serverckecklist.user.dto.UserDto;
import com.ase.serverckecklist.user.entity.User;
import com.ase.serverckecklist.security.auth.entity.Verification;
import com.ase.serverckecklist.user.repository.UserRepository;
import com.ase.serverckecklist.security.auth.repository.VerificationRepository;
import com.ase.serverckecklist.security.auth.dto.AuthenticationRequest;
import com.ase.serverckecklist.security.auth.dto.AuthenticationResponse;
import com.ase.serverckecklist.security.auth.dto.VerificationRequest;
import com.ase.serverckecklist.security.auth.dto.VerificationResponse;
import com.ase.serverckecklist.security.config.RandomString;
import com.ase.serverckecklist.security.config.SecurityProperties;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // 쿠키와 헤더 생성
    public HttpHeaders setCookieHeader(String refreshToken) {
        // Cookie 생성
        ResponseCookie cookie = ResponseCookie.from("refresh-token", refreshToken)
                .path("/api/auth") // cookie가 전송될 경로 설정
                .httpOnly(true) // 클라이언트에서 javascript로 접근 불가
                .secure(true) // https 적용
                .sameSite("Strict") // sameSite 적용
                .build();

        // Set-Cookie로 Header에 Cookie 추가
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());

        return headers;
    }

    // Access Token을 담은 응답용 인스턴스 생성
    public ResponseEntity<AuthenticationResponse> buildAuthenticationResponse(
            HttpHeaders headers, String accessToken
    ) {
        // 인증 응답 객체 생성
        AuthenticationResponse response = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .build();

        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

    // 회원가입
    @Transactional
    public ResponseEntity<?> register(UserDto dto) {
        // 요청으로부터 온 데이터로 사용자 객체 생성
        User user = dto.toEntity();

        // 중복id 존재 시 데이터 추가 x
        if (user.getId() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // 중요한 데이터가 빠지면 진행 중단
        if (isInvalidUser(user)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        
        // 형식 유효성 검사
        if (!isValidFormat(user)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // 비밀번호 인코딩
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        // 권한 설정 - 일반 사용자
        user.setRoles(new String[]{"USER"});

        // -----테스트용
        // 이메일 인증 완료
        user.setVerification(true);

        // 사용자 저장
        userRepository.save(user);

        // 이메일 인증 정보 생성 및 DB 저장
        //saveVerification(user.getEmail());

        // 인증 응답 객체 생성
        return ResponseEntity.ok().build();
    }

    // 사용자 데이터 확인
    // 하나라도 빠진 데이터가 있으면 true를 반환
    public boolean isInvalidUser(User user) {
        return user.getEmail() == null || user.getEmail().isEmpty()
                || user.getPassword() == null || user.getPassword().isEmpty()
                || user.getNickname() == null || user.getNickname().isEmpty();
    }

    // 사용자 데이터 형식 검사
    // 정규식 하나라도 통과 못하면 false 반환
    public boolean isValidFormat(User user) {
        return user.getEmail().matches(securityProperties.getEmailRegex()) &&
               user.getPassword().matches(securityProperties.getPasswordRegex()) &&
               user.getNickname().matches(securityProperties.getNameRegex());
    }

    // 로그인
    @Transactional
    public ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request) {
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
        // 401로 반환
        if (!isValidAccount(user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 토큰 생성 - 사용자 정보로 생성
        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        // 기존에 db에 저장된 사용자의 모든 Refresh Token 제거
        jwtService.removeAllUserToken(user);

        // token을 db에 저장
        jwtService.saveUserToken(refreshToken, user);

        // cookie를 담은 header 생성
        HttpHeaders header = setCookieHeader(refreshToken);

        // 인증 응답 객체 생성
        return buildAuthenticationResponse(header, accessToken);
    }

    // 사용자 계정 유효 검사
    // 인증이 없거나, 만료됬거나, 잠겼거나, 사용 가능 상태 확인
    public boolean isValidAccount(User user) {
        return user.isVerified() && user.isAccountNonExpired()
                && user.isAccountNonLocked() && user.isEnabled();
    }

    // Access Token 재발급
    @Transactional
    public ResponseEntity<AuthenticationResponse> refreshToken(
            HttpServletRequest request
    ) {
        // cookie 가져오기
        Cookie[] cookies = request.getCookies();

        // cookie가 없다면 인증 실패 응답 반환
        if (cookies == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Refresh Token 저장 인스턴스
        String token = null;

        // cookie 들 중에서 이름이 refresh-token인 cookie의 값 가져오기
        for (Cookie cookie : cookies) {
            if ("refresh-token".equals(cookie.getName())) {
                token = cookie.getValue();
                break;
            }
        }

        // Refresh token이 cookie에 없다면 인증 실패 응답 반환
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // jwt로부터 사용자 이메일을 추출
        String userEmail = jwtService.extractUsername(token);

        // 검증 절차
        // 사용자 존재 여부
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(()->new UsernameNotFoundException("No user found"));

        // Refresh Token 유효성 검사
        if (jwtService.isRefreshTokenValid(token, user)) {
            // 유효할 경우 재발급 진행
            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            // 기존에 db에 저장된 Refresh Token 제거
            jwtService.removeUserToken(token, user);

            // 토큰을 db에 저장
            jwtService.saveUserToken(refreshToken, user);

            // cookie를 담은 header 생성
            HttpHeaders header = setCookieHeader(refreshToken);

            // 인증 응답 객체 생성
            return buildAuthenticationResponse(header, accessToken);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // 이메일 인증용 코드 생성
    @Transactional
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
    @Transactional
    public VerificationResponse verifyEmail(VerificationRequest request) {
        // 인증 결과 전송용 객체
        VerificationResponse response = new VerificationResponse();

        // 해당 이메일의 사용자 조회
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        // DB에 저장된 이메일과 코드하고 비교
        Verification verification = verificationRepository.findByEmail(request.getEmail());

        // DB에 저장된 인증 코드가 없거나 만료되었다면 인증 절차 취소
        if (user == null || verification == null || verification.isCodeExpired()) {
            response.setVerified(false);
            response.setResult("Verification failed");
            return response;
        }

        // 사용자가 이미 인증된 상태면 절차 취소
        if (user.isVerified()) {
            response.setVerified(false);
            response.setResult("User is already verified");
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
