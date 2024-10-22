package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.dto.ServerInfoDto;
import com.ase.serverckecklist.entity.ServerInfo;
import com.ase.serverckecklist.service.ServerInfoService;
import com.ase.serverckecklist.vo.ServerInfoVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/servers")
@Slf4j
@RequiredArgsConstructor
public class ServerInfoController {

    private final ServerInfoService serverInfoService;

    // GET
    // 서버 전체 목록 가져오기
    @GetMapping("/list")
    public ArrayList<ServerInfoVO> index() {
        return serverInfoService.index();
    }

    // 특정 서버 정보 가져오기
    @GetMapping("{id}")
    public ServerInfo index(@PathVariable("id") String id) {
        return serverInfoService.show(id);
    }

    // POST
    // 서버 추가하기
    @PostMapping("")
    public ResponseEntity<ServerInfo> create(@RequestBody ServerInfoDto dto) {
        ServerInfo created = serverInfoService.create(dto);

        return (created != null) ?
                ResponseEntity.status(HttpStatus.OK).body(created) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // PATCH
    // 서버 수정하기
    @PatchMapping("{id}")
    public ResponseEntity<ServerInfo> update(
            @PathVariable("id") String id,
            @RequestBody ServerInfoDto dto
    ) {
        ServerInfo updated = serverInfoService.update(id, dto);

        return (updated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // DELETE
    // 서버 삭제하기
    @DeleteMapping("{id}")
    public ResponseEntity<ServerInfo> delete(@PathVariable("id") String id) {
        ServerInfo deleted = serverInfoService.delete(id);

        // Service에서 제대로 삭제했다면 삭제한 Entity를 반환해줌
        // Entity == null일 경우는 id에 해당하는 데이터가 없음을 의미
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
