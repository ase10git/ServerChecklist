package com.ase.serverckecklist.server.controller;

import com.ase.serverckecklist.server.dto.MemoDto;
import com.ase.serverckecklist.server.entity.Memo;
import com.ase.serverckecklist.server.service.MemoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/memo")
@Slf4j
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;

    // GET
    // 특정 서버의 모든 메모 가져오기
    @GetMapping("/list/{serverId}")
    public ArrayList<Memo> index(@PathVariable("serverId") String serverId) {
        return memoService.index(serverId);
    }

    // 특정 서버에 가장 최근에 추가되고, 최신 변경 순서대로 상위 6개 가져오기
    @GetMapping("/recentlist/{serverId}")
    public ArrayList<Memo> recentList(@PathVariable("serverId") String serverId) {
        return memoService.recentList(serverId);
    }

    // 특정 메모 가져오기
    @GetMapping("{id}")
    public Memo show(@PathVariable("id") String id) {
        return memoService.show(id);
    }

    // POST
    // 메모 추가하기
    @PostMapping("")
    public ResponseEntity<Memo> create(@RequestBody MemoDto dto) {
        Memo created = memoService.create(dto);

        return (created != null) ?
                ResponseEntity.status(HttpStatus.OK).body(created) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // PATCH
    // 메모 수정하기
    @PatchMapping("{id}")
    public ResponseEntity<Memo> update(
            @PathVariable("id") String id,
            @RequestBody MemoDto dto
    ) {
        Memo updated = memoService.update(id, dto);

        return (updated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // DELETE
    // 메모 삭제하기
    @DeleteMapping("{id}")
    public ResponseEntity<Memo> delete(@PathVariable("id") String id) {
        Memo deleted = memoService.delete(id);

        // Service에서 제대로 삭제했다면 삭제한 Entity를 반환해줌
        // Entity == null일 경우는 id에 해당하는 데이터가 없음을 의미
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
