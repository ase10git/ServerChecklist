package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.dto.MapDto;
import com.ase.serverckecklist.entity.Map;
import com.ase.serverckecklist.service.MapService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@RequestMapping("/api/maps")
@Slf4j
@RequiredArgsConstructor
public class MapController {

    private final MapService mapService;

    // GET
    @GetMapping("/list/{serverId}")
    public ArrayList<Map> index(@PathVariable("serverId") String serverId) {
        return mapService.index(serverId);
    }

    @GetMapping("{id}")
    public Map show(@PathVariable("id") String id) {
        return mapService.show(id);
    }

    // POST
    @PostMapping("")
    public ResponseEntity<Map> create(@RequestBody MapDto dto) {
        Map created = mapService.create(dto);

        return (created != null) ?
                ResponseEntity.status(HttpStatus.OK).body(created) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // PATCH
    @PatchMapping("{id}")
    public ResponseEntity<Map> update(
            @PathVariable("id") String id,
            @RequestBody MapDto dto
    ) {
        Map updated = mapService.update(id, dto);

        return (updated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // DELETE
    @DeleteMapping("{id}")
    public ResponseEntity<Map> delete(@PathVariable("id") String id) {
        Map deleted = mapService.delete(id);

        // Service에서 제대로 삭제했다면 삭제한 Entity를 반환해줌
        // Entity == null일 경우는 id에 해당하는 데이터가 없음을 의미
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
