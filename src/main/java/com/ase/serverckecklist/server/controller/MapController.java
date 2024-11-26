package com.ase.serverckecklist.server.controller;

import com.ase.serverckecklist.server.dto.MapDto;
import com.ase.serverckecklist.server.entity.Map;
import com.ase.serverckecklist.server.service.MapService;
import com.ase.serverckecklist.server.vo.MapVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/maps")
@Slf4j
@RequiredArgsConstructor
public class MapController {

    private final MapService mapService;

    // GET
    // 특정 서버의 모든 지도 가져오기
    @GetMapping("/list/{serverId}")
    public ArrayList<MapVO> index(@PathVariable("serverId") String serverId) {
        return mapService.index(serverId);
    }

    // 특정 서버에 최근에 추가되고, 최근에 수정된 순서로 상위 6개 가져오기
    @GetMapping("/recentlist/{serverId}")
    public ArrayList<MapVO> recentList(@PathVariable("serverId") String id) {
        return mapService.recentList(id);
    }

    // 특정 지도 가져오기
    @GetMapping("{id}")
    public MapVO show(@PathVariable("id") String id) {
        return mapService.show(id);
    }

    // POST
    // 지도 추가하기
    @PostMapping("")
    public ResponseEntity<Map> create(
            @ModelAttribute MapDto dto
        ) throws IOException {
        Map created = mapService.create(dto);

        return (created != null) ?
                ResponseEntity.status(HttpStatus.OK).body(created) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // PATCH
    // 지도 수정하기
    @PatchMapping("{id}")
    public ResponseEntity<Map> update(
            @PathVariable("id") String id,
            @ModelAttribute MapDto dto
    ) throws IOException {
        Map updated = mapService.update(id, dto);

        return (updated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // DELETE
    // 지도 삭제하기
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
