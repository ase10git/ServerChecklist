package com.ase.serverckecklist.security.auth;

import com.ase.serverckecklist.dto.UserDto;
import com.ase.serverckecklist.entity.User;
import com.ase.serverckecklist.repository.UserRepository;
import com.ase.serverckecklist.security.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    // DB와 상호작용하는 사용자 repo
    private final UserRepository repository;
    // 비밀번호 인코더
    private final PasswordEncoder passwordEncoder;
    // jwt 서비스
    private final JwtService jwtService;
    // 사용자 신원 확인
    private final AuthenticationManager authenticationManager;

    // 회원가입
    public AuthenticationResponse register(UserDto dto) {
        // 요청으로부터 온 데이터로 사용자 객체 생성
        User user = dto.toEntity();
        // 사용자 저장
        repository.save(user);
        // 토큰 생성 - 사용자 정보로 생성
        var jwtToken = jwtService.generateToken(user);
        // 인증 응답 객체 생성
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    // 인증 확인
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // 요청으로 들어온 사용자의 신원 확인
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        // 위의 인증을 거친 사용자를 DB에 검색
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        // 토큰 생성 - 사용자 정보로 생성
        var jwtToken = jwtService.generateToken(user);
        // 인증 응답 객체 생성
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
