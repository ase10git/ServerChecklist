package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.dto.CheckListDto;
import com.ase.serverckecklist.entity.CheckList;
import com.ase.serverckecklist.service.CheckListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/checklists")
@Slf4j
@RequiredArgsConstructor
public class CheckListController {
    
    private final CheckListService checkListService;

    // GET
    // 특정 서버의 전체 체크리스트 가져오기
    @GetMapping("/list/{serverId}")
    public ArrayList<CheckList> index(@PathVariable("serverId") String serverId) {
        return checkListService.index(serverId);
    }

    // 특정 서버에 최근에 추가되고, 최근에 변경된 순서로 상위 6개 가져오기
    @GetMapping("/recentlist/{serverId}")
    public ArrayList<CheckList> recentList(@PathVariable("serverId") String serverId) {
        return checkListService.recentList(serverId);
    }

    // 특정 체크리스트 가져오기
    @GetMapping("{id}")
    public CheckList show(@PathVariable("id") String id) {
        return checkListService.show(id);
    }

    // POST
    // 체크리스트 추가하기
    @PostMapping("")
    public ResponseEntity<CheckList> create(@RequestBody CheckListDto dto) {
        CheckList created = checkListService.create(dto);

        return (created != null) ?
                ResponseEntity.status(HttpStatus.OK).body(created) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // PATCH
    // 체크리스트 수정하기
    @PatchMapping("{id}")
    public ResponseEntity<CheckList> update(
            @PathVariable("id") String id,
            @RequestBody CheckListDto dto
    ) {
        CheckList updated = checkListService.update(id, dto);

        return (updated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // DELETE
    // 체크리스트 삭제하기
    @DeleteMapping("{id}")
    public ResponseEntity<CheckList> delete(@PathVariable("id") String id) {
        CheckList deleted = checkListService.delete(id);

        // Service에서 제대로 삭제했다면 삭제한 Entity를 반환해줌
        // Entity == null일 경우는 id에 해당하는 데이터가 없음을 의미
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
