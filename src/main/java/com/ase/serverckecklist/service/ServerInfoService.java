package com.ase.serverckecklist.service;

import com.ase.serverckecklist.dto.ServerInfoDto;
import com.ase.serverckecklist.entity.ServerInfo;
import com.ase.serverckecklist.repository.ServerInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ServerInfoService {

    private final ServerInfoRepository serverInfoRepository;

    // 서버 전체 조회
    public ArrayList<ServerInfo> index() {
        return (ArrayList<ServerInfo>) serverInfoRepository.findAll();
    }

    // id로 서버 조회
    public ServerInfo show(@PathVariable String id) {
        return serverInfoRepository.findById(id).orElse(null);
    }

    // 새 서버 추가
    public ServerInfo create(ServerInfoDto dto) {
        ServerInfo serverInfo = dto.toEntity();

        if (serverInfo.getId() != null) { // 중복id 존재 시 데이터 추가 x
            return null;
        }

        return serverInfoRepository.save(serverInfo);
    }

    // 서버 수정
    public ServerInfo update(String id, ServerInfoDto dto) {
        ServerInfo serverInfo = dto.toEntity();

        // 수정 대상
        ServerInfo target = serverInfoRepository.findById(id).orElse(null);

        // 잘못된 요청 처리
        if (target == null || !id.equals(serverInfo.getId())) {
            return null;
        }

        // 기존 데이터에 새 데이터 붙이기
        target.patch(serverInfo);
        return serverInfoRepository.save(target);
    }


    // 서버 삭제
    public ServerInfo delete(String id) {
        ServerInfo target = serverInfoRepository.findById(id).orElse(null);

        // 대상이 없으면 잘못된 요청 처리
        if (target == null) {
            return null;
        }
        
        serverInfoRepository.delete(target);
        return target; // HTTP 응답의 body가 없는 ResponseEntity 생성
    }
}
