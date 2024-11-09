package com.ase.serverckecklist.service;

import com.ase.serverckecklist.dto.UserDto;
import com.ase.serverckecklist.entity.User;
import com.ase.serverckecklist.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    // 사용자 DB 연결 repository
    private final UserRepository userRepository;
    // 비밀번호 인코더
    private final PasswordEncoder passwordEncoder;

    // 이메일로 유저 조회
    public User show(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // 유저 수정
    public User update(String email, UserDto dto) {
        User user = dto.toEntity();
        // 비밀번호 인코딩
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        
        // 수정 대상
        User target = userRepository.findByEmail(email)
                .orElse(null);

        // 잘못된 요청 처리
        if (target == null || !email.equals(user.getEmail())) {
            return null;
        }

        // 기존 데이터에 새 데이터 붙이기
        target.patch(user);
        return userRepository.save(target);
    }

    // 유저 삭제
    public User delete(String email) {
       User target = userRepository.findByEmail(email).orElse(null);

       // 대상이 없으면 잘못된 요청 처리
        if (target == null) {
            return null;
        }

        userRepository.delete(target);
        return target; // HTTP 응답의 body가 없는 ResponseEntity 생성
    }


}
