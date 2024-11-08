package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.dto.UserDto;
import com.ase.serverckecklist.security.auth.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
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

    // 이메일 인증
    @PostMapping("/verifyemail")
    public ResponseEntity<String> verification (
            @RequestBody VerificationRequest request
            ) {
        VerificationResponse response = service.verifyEmail(request);
        return (response.isVerified()) ?
                ResponseEntity.ok(response.getResult())
                : ResponseEntity.badRequest().body(response.getResult());
    }

}
