package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.dto.UserDto;
import com.ase.serverckecklist.security.auth.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService service;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<?> register (
            @RequestBody UserDto dto
    ) {
        return service.register(dto);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request
    ) {
        return service.authenticate(request);
    }

    // 재발급
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> authenticate (
            HttpServletRequest request
    ) {
        return service.refreshToken(request);
    }

    // 이메일 인증
    @PostMapping("/verify-email")
    public ResponseEntity<String> verification (
            @RequestBody VerificationRequest request
            ) {
        VerificationResponse response = service.verifyEmail(request);
        return (response.isVerified()) ?
                ResponseEntity.ok(response.getResult())
                : ResponseEntity.badRequest().body(response.getResult());
    }
}
