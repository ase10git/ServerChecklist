package com.ase.serverckecklist.user.controller;

import com.ase.serverckecklist.user.dto.UserInfoDto;
import com.ase.serverckecklist.user.dto.UserPwdDto;
import com.ase.serverckecklist.user.entity.User;
import com.ase.serverckecklist.user.service.UserService;
import com.ase.serverckecklist.user.vo.UserVO;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // GET
    @GetMapping("{email}")
    public ResponseEntity<UserVO> index(
            @PathVariable("email") String email
    ) {
        UserVO user = userService.show(email);

        return (user != null) ?
                ResponseEntity.status(HttpStatus.OK).body(user) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @GetMapping("/current-user")
    public ResponseEntity<UserVO> currentUser(
            HttpServletRequest request
    ) {
        UserVO user = userService.currentUser(request);

        return (user != null) ?
                ResponseEntity.status(HttpStatus.OK).body(user) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // PATCH
    @PatchMapping("{email}")
    public ResponseEntity<User> update(
            HttpServletRequest request,
            @PathVariable("email") String email,
            @ModelAttribute UserInfoDto dto
    ) throws IOException {
        User updated = userService.update(request, email, dto);

        return (updated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PatchMapping("/new-password/{email}")
    public ResponseEntity<String> update(
            HttpServletRequest request,
            @PathVariable("email") String email,
            @RequestBody UserPwdDto dto
    ) {
        return userService.update(request, email, dto);
    }

    // 서버 가입
    @PatchMapping("/join-server/{id}")
    public ResponseEntity<String> joinServer(
            HttpServletRequest request,
            @PathVariable("id") String id
    ) {
        return userService.joinServer(request, id);
    }

    // 서버 탈퇴
    @PatchMapping("/leave-server/{id}")
    public ResponseEntity<String> leaveServer(
            HttpServletRequest request,
            @PathVariable("id") String id
    ) {
        return userService.leaveServer(request, id);
    }

    // DELETE
    @DeleteMapping("{email}")
    public ResponseEntity<User> delete(@PathVariable("email") String email) {
        User deleted = userService.delete(email);

        // Service에서 제대로 삭제했다면 삭제한 Entity를 반환해줌
        // Entity == null일 경우는 id에 해당하는 데이터가 없음을 의미
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
