package com.ase.serverckecklist.user.service;

import com.ase.serverckecklist.file.service.FileService;
import com.ase.serverckecklist.security.auth.service.JwtService;
import com.ase.serverckecklist.server.entity.ServerInfo;
import com.ase.serverckecklist.server.repository.ServerInfoRepository;
import com.ase.serverckecklist.user.dto.UserInfoDto;
import com.ase.serverckecklist.user.dto.UserPwdDto;
import com.ase.serverckecklist.user.entity.Role;
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
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    // 사용자 DB 연결 repository
    private final UserRepository userRepository;
    // file 관리
    private final FileService fileService;
    // 서버
    private final ServerInfoRepository serverInfoRepository;
    // 비밀번호 인코더
    private final PasswordEncoder passwordEncoder;
    // jwt
    private final JwtService jwtService;

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
                        .joinedServerList(target.getJoinedServerList())
                        .role(target.getRole())
                        .build();
            }

        return null;
    }
    
    // token으로 확인하는 현재 유저
    public UserVO currentUser(HttpServletRequest request) {
        // header에서 token 추출
        final String jwt = jwtService.resolveToken(request);
        
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
    public User update(HttpServletRequest request, String email, UserInfoDto dto) throws IOException {
        // 현재 로그인 한 사용자 정보 가져오기
        UserVO loggedinUser = currentUser(request);
        // 로그인 안 한 사용자나 다른 사용자의 정보 변경 시도 차단
        if (loggedinUser == null || !loggedinUser.getEmail().equals(email)) {
            return null;
        }

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
    public ResponseEntity<String> update(HttpServletRequest request, String email, UserPwdDto dto) {
        // 현재 로그인 한 사용자 정보 가져오기
        UserVO currentUser = currentUser(request);

        // 로그인 안 한 사용자나 다른 사용자의 정보 변경 시도 차단
        if (currentUser == null || !currentUser.getEmail().equals(email)) {
            return null;
        }

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

    // 특정 서버 가입
    @Transactional
    public ResponseEntity<String> joinServer(HttpServletRequest request, String id) {
        // 현재 로그인 한 사용자 정보 가져오기
        UserVO currentUser = currentUser(request);

        // 로그인 안 한 사용자의 접근 차단
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 서버 id 검증
        ServerInfo serverInfo = serverInfoRepository.findById(id).orElse(null);

        if (serverInfo == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("존재하지 않는 서버입니다");
        }

        // 수정 대상
        User target = userRepository.findByEmail(currentUser.getEmail()).orElse(null);

        // 잘못된 요청 처리
        if (target == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("존재하지 않는 사용자입니다");
        }

        // 사용자의 참여 서버 리스트 가져오기
        List<String> serverList = target.getJoinedServerList();

        //  리스트가 비어있다면 새로 생성 및 데이터 추가
        if (serverList == null) {
            serverList = new ArrayList<>();
        }

        // 리스트 수정
        serverList.add(id);

        // 사용자의 역할에 SERVER_USER가 없다면 추가
        List<Role> role = target.getRole();

        if(!role.contains(Role.SERVER_USER)) {
            role.add(Role.SERVER_USER);
        }

        // 저장할 데이터를 담은 User 인스턴스
        User user = User.builder()
                .joinedServerList(serverList)
                .role(role)
                .build();

        // 기존 데이터에 새 데이터 붙이기
        target.patch(user);

        // 수정 내용 저장
        userRepository.save(target);
        return ResponseEntity.ok().build();
    }

    // 특정 서버 탈퇴
    @Transactional
    public ResponseEntity<String> leaveServer(HttpServletRequest request, String id) {
        // 현재 로그인 한 사용자 정보 가져오기
        UserVO currentUser = currentUser(request);

        // 로그인 안 한 사용자의 접근 차단
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 서버 id 검증
        ServerInfo serverInfo = serverInfoRepository.findById(id).orElse(null);

        if (serverInfo == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("존재하지 않는 서버입니다");
        }

        // 수정 대상
        User target = userRepository.findByEmail(currentUser.getEmail()).orElse(null);

        // 잘못된 요청 처리
        if (target == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("존재하지 않는 사용자입니다");
        }

        // 사용자의 참여 서버 리스트 가져오기
        List<String> serverList = target.getJoinedServerList();

        // 리스트가 비어있다면 처리 중지
        if (serverList == null) {
            return ResponseEntity.ok().build();
        }

        // 리스트 수정
        serverList.remove(id);

        // 사용자가 가입한 다른 서버가 없다면 SERVER_USER 역할 제거
        List<Role> role = target.getRole();

        if(role.contains(Role.SERVER_USER) && serverList.isEmpty()) {
            role.remove(Role.SERVER_USER);
        }

        // 저장할 데이터를 담은 User 인스턴스
        User user = User.builder()
                .joinedServerList(serverList)
                .role(role)
                .build();

        // 기존 데이터에 새 데이터 붙이기
        target.patch(user);

        // 수정 내용 저장
        userRepository.save(target);
        return ResponseEntity.ok().build();
    }

    // 서버 관리자 등록
    @Transactional
    public String promoteServerAdmin(String email) {
        // 수정 대상
        User target = userRepository.findByEmail(email).orElse(null);

        if (target == null) {
            return "failed";
        }

        // 사용자의 역할에 SERVER_ADMIN이 없다면 추가
        List<Role> role = target.getRole();

        if(!role.contains(Role.SERVER_ADMIN)) {
            role.add(Role.SERVER_ADMIN);
        }

        if(!role.contains(Role.SERVER_USER)) {
            role.add(Role.SERVER_USER);
        }

        // 저장할 데이터를 담은 User 인스턴스
        User user = User.builder()
                .role(role)
                .build();

        // 기존 데이터에 새 데이터 붙이기
        target.patch(user);

        // 수정 내용 저장
        userRepository.save(target);

        return "success";
    }

    @Transactional
    public String promoteServerAdmin(User user) {
        // 사용자의 역할에 SERVER_ADMIN이 없다면 추가
        List<Role> role = user.getRole();

        if(!role.contains(Role.SERVER_ADMIN)) {
            role.add(Role.SERVER_ADMIN);
        }

        if(!role.contains(Role.SERVER_USER)) {
            role.add(Role.SERVER_USER);
        }

        // 저장할 데이터를 담은 User 인스턴스
        User newUserInfo = User.builder()
                .role(role)
                .build();

        // 기존 데이터에 새 데이터 붙이기
        user.patch(newUserInfo);

        // 수정 내용 저장
        userRepository.save(user);

        return "success";
    }

    // 서버 관리자 변경
    @Transactional
    public String demoteServerAdmin(String prevAdmin, String newAdmin, String serverId) {
        // 수정 대상
        User prevAdminUser = userRepository.findByEmail(prevAdmin).orElse(null);
        User newAdminUser = userRepository.findByEmail(newAdmin).orElse(null);

        if (prevAdminUser == null || newAdminUser == null) {
            return "failed";
        }

        // 새 관리자에 서버 관리자 역할이 없다면 등록하기
        promoteServerAdmin(newAdminUser);

        // 기본 서버 관리자의 역할 가져오기
        List<Role> prevAdminUserRole = prevAdminUser.getRole();

        if(!prevAdminUserRole.contains(Role.SERVER_ADMIN)) {
            return "success";
        }

        // 사용자의 참여 서버 리스트 가져오기
        List<String> serverList = prevAdminUser.getJoinedServerList();

        for(String id : serverList) {
            // 서버 검색
            ServerInfo serverInfo = serverInfoRepository.findById(id).orElse(null);

            if (serverInfo != null) {
                // 변경하려는 사용자가 serverId가 아닌 다른 조회한 서버의 관리자인지 확인
                if (!serverInfo.getId().equals(serverId) &&
                        serverInfo.getManagerId().equals(prevAdminUser.getEmail())) {
                    break;
                }
                // serverId에서만 관리자라면 서버 관리자 역할 제거
                prevAdminUserRole.remove(Role.SERVER_ADMIN);
            }
        }

        // 저장할 데이터를 담은 User 인스턴스
        User user = User.builder()
                .role(prevAdminUserRole)
                .build();

        // 기존 데이터에 새 데이터 붙이기
        prevAdminUser.patch(user);

        // 수정 내용 저장
        userRepository.save(prevAdminUser);

        return "success";
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
