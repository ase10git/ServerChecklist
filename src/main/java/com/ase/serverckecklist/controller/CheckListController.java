package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.dto.CheckListDto;
import com.ase.serverckecklist.entity.CheckList;
import com.ase.serverckecklist.service.CheckListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@RequestMapping("/api/checklists")
@Slf4j
@RequiredArgsConstructor
public class CheckListController {
    
    private final CheckListService checkListService;

    // GET
    @GetMapping("/list")
    public ArrayList<CheckList> index() {
        return checkListService.index();
    }

    @GetMapping("{id}")
    public CheckList index(@PathVariable("id") String id) {
        return checkListService.show(id);
    }

    // POST
    @PostMapping("")
    public ResponseEntity<CheckList> create(@RequestBody CheckListDto dto) {
        CheckList created = checkListService.create(dto);

        return (created != null) ?
                ResponseEntity.status(HttpStatus.OK).body(created) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // PATCH
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
