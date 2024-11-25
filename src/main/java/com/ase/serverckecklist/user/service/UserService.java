package com.ase.serverckecklist.user.service;

import com.ase.serverckecklist.user.dto.UserDto;
import com.ase.serverckecklist.user.entity.User;
import com.ase.serverckecklist.user.repository.UserRepository;
import com.ase.serverckecklist.user.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    // 사용자 DB 연결 repository
    private final UserRepository userRepository;
    // 비밀번호 인코더
    private final PasswordEncoder passwordEncoder;

    // 이메일로 유저 조회
    public UserVO show(String email) {
        User target = userRepository.findByEmail(email).orElse(null);

        // 잠기거나 사용 불가 계정의 사용자라면 조회 요청 거부
        if (target != null && (target.isAccountNonLocked() || target.isEnabled())) {
                return UserVO.builder()
                        .email(target.getEmail())
                        .nickname(target.getNickname())
                        .profile(target.getProfile())
                        .verification(target.isVerified())
                        .registerDate(target.getRegisterDate().toString())
                        .modifiedDate(target.getModifiedDate().toString())
                        .build();
            }

        return null;
    }

    // 유저 수정
    @Transactional
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
    @Transactional
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
