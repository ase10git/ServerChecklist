package com.ase.serverckecklist.user.service;

import com.ase.serverckecklist.file.service.FileService;
import com.ase.serverckecklist.security.auth.service.JwtService;
import com.ase.serverckecklist.user.dto.UserInfoDto;
import com.ase.serverckecklist.user.dto.UserPwdDto;
import com.ase.serverckecklist.user.entity.User;
import com.ase.serverckecklist.user.repository.UserRepository;
import com.ase.serverckecklist.user.vo.UserVO;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    // 사용자 DB 연결 repository
    private final UserRepository userRepository;
    // file 관리
    private final FileService fileService;
    // 비밀번호 인코더
    private final PasswordEncoder passwordEncoder;
    // jwt
    private final JwtService jwtService;

    // header에서 token 추출
    public String resolveToken(HttpServletRequest request) {
        // 요청으로 온 header 내용 추출
        final String authHeader = request.getHeader("Authorization");

        // jwt가 없으면 null 반환
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        // jwt
        return authHeader.substring(7);
    }
    
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

    // token으로 확인하는 현재 유저
    public UserVO currentUser(HttpServletRequest request) {
        // header에서 token 추출
        final String jwt = resolveToken(request);
        
        if (jwt == null) {
            return null;
        }
        
        // jwt에서 사용자 이메일 추출
        final String userEmail = jwtService.extractUsername(jwt);

        // 이메일로 사용자를 조회한 결과 반환
        return show(userEmail);
    }

    // 유저 수정
    @Transactional
    public User update(String email, UserInfoDto dto) throws IOException {
        // 수정 대상
        User target = userRepository.findByEmail(email)
                .orElse(null);

        // 잘못된 요청 처리
        if (target == null || !email.equals(dto.getEmail())) {
            return null;
        }

        // 수정할 파일 id
        MultipartFile file = dto.getProfile();
        String fileId = target.getProfile();

        // 파일 삭제 요청 여부
        if (dto.isFileDeleteFlag() || (file != null && !file.isEmpty())) { // 삭제 요청 있을 때
            // 기존 파일 제거
            fileService.deleteFile(target.getProfile());
            fileId = null;

            // 파일이 있는 경우에만 파일 등록 수행 후 파일 id 가져오기
            if (file != null && !file.isEmpty()) {
                fileId = fileService.addFile(file);
            }

        }

        User user = dto.toEntity(fileId);

        // 기존 데이터에 새 데이터 붙이기
        target.patch(user, dto.isFileDeleteFlag());
        return userRepository.save(target);
    }

    // 사용자 비밀번호 수정
    @Transactional
    public ResponseEntity<String> update(String email, UserPwdDto dto) {
        // 수정 대상
        User target = userRepository.findByEmail(email).orElse(null);

        // 잘못된 요청 처리
        if (target == null || !email.equals(dto.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("존재하지 않는 사용자입니다");
        }

        // 현재 비밀번호가 DB에 저장된 비밀번호와 일치하는지 확인
        if (!passwordEncoder.matches(dto.getCurrentPassword(), target.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("현재 비밀번호가 일치하지 않습니다");
        }

        // 저장할 데이터를 담은 User 인스턴스
        User user = dto.toEntity(passwordEncoder.encode(dto.getNewPassword()));

        // 기존 데이터에 새 데이터 붙이기
        target.patch(user);

        log.info(user.toString());
        log.info(target.toString());

        // 저장
        userRepository.save(target);
        return ResponseEntity.ok().build();
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
