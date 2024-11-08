package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.dto.UserDto;
import com.ase.serverckecklist.security.auth.AuthenticationRequest;
import com.ase.serverckecklist.security.auth.AuthenticationResponse;
import com.ase.serverckecklist.security.auth.AuthenticationService;
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
        return ResponseEntity.ok(service.register(dto));
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
