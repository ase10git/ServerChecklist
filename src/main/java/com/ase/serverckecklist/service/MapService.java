package com.ase.serverckecklist.service;

import com.ase.serverckecklist.dto.MapDto;
import com.ase.serverckecklist.entity.Map;
import com.ase.serverckecklist.repository.MapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MapService {

    private final MapRepository mapRepository;


    // 서버의 맵 전체 조회
    public ArrayList<Map> index(String serverId) { // 서버 id를 매개변수로 받고, 메소드 추가!!!
        return mapRepository.findByServerId(serverId);
    }

    // id로 맵 조회
    public Map show(String id) {
        return mapRepository.findById(id).orElse(null);
    }

    // 새 맵 추가
    public Map create(MapDto dto) {
        Map map = dto.toEntity();

        if (map.getId() != null) { // 중복id 존재 시 데이터 추가 x
            return null;
        }

        return mapRepository.save(map);
    }

    // 맵 수정
    public Map update(String id, MapDto dto) {
        Map map = dto.toEntity();

        // 수정 대상
        Map target = mapRepository.findById(id).orElse(null);

        // 잘못된 요청 처리
        if (target == null || !id.equals(map.getId())) {
            return null;
        }

        // 기존 데이터에 새 데이터 붙이기
        target.patch(map);
        return mapRepository.save(target);
    }


    // 맵 삭제
    public Map delete(String id) {
        Map target = mapRepository.findById(id).orElse(null);

        // 대상이 없으면 잘못된 요청 처리
        if (target == null) {
            return null;
        }

        mapRepository.delete(target);
        return target; // HTTP 응답의 body가 없는 ResponseEntity 생성
    }
}
