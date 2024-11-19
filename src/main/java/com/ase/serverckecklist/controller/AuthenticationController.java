package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.dto.UserDto;
import com.ase.serverckecklist.security.auth.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody UserDto dto
    ) {
        AuthenticationResponse response = service.register(dto);
        return (response != null) ?
                ResponseEntity.ok(response)
                : ResponseEntity.badRequest().build();
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse response = service.authenticate(request);
        return (response != null) ?
                ResponseEntity.ok(response)
                : ResponseEntity.badRequest().build();
    }

    // 재발급
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> authenticate (
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        return service.refreshToken(request, response);
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
