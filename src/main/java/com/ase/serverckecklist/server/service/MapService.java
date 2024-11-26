package com.ase.serverckecklist.server.service;

import com.ase.serverckecklist.server.dto.MapDto;
import com.ase.serverckecklist.server.entity.Map;
import com.ase.serverckecklist.server.repository.MapRepository;
import com.ase.serverckecklist.file.service.FileService;
import com.ase.serverckecklist.server.vo.MapVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MapService {

    private final MapRepository mapRepository;
    private final FileService fileService;

    // 서버의 맵 전체 조회
    public ArrayList<MapVO> index(String serverId) {
        // 지도 리스트
        ArrayList<Map> list =  mapRepository.findByServerId(serverId);
        // 결과를 반환할 리스트
        ArrayList<MapVO> voList = new ArrayList<>();

        // Map -> MapVO 변환
        for(Map map : list) {
            MapVO vo = MapVO.builder()
                    .id(map.getId())
                    .title(map.getTitle())
                    .location(map.getLocation())
                    .photoId(map.getPhotoId())
                    .ownerId(map.getOwnerId())
                    .serverId(map.getServerId())
                    .description(map.getDescription())
                    .createdDate(map.getCreatedDate().toString())
                    .modifiedDate(map.getModifiedDate().toString())
                    .build();
            voList.add(vo);
        }
        return voList;
    }

    // 가장 최근에 서버에 추가된 맵 상위 6개만 가져오기
    public ArrayList<MapVO> recentList(String serverId) {
        // 지도 리스트
        ArrayList<Map> list = mapRepository.findTop6ByServerIdOrderByCreatedDateDescModifiedDateDesc(serverId);
        // 결과를 반환할 리스트
        ArrayList<MapVO> voList = new ArrayList<>();

        // Map -> MapVO 변환
        for(Map map : list) {
            MapVO vo = MapVO.builder()
                        .id(map.getId())
                        .title(map.getTitle())
                        .location(map.getLocation())
                        .photoId(map.getPhotoId())
                        .ownerId(map.getOwnerId())
                        .serverId(map.getServerId())
                        .description(map.getDescription())
                        .createdDate(map.getCreatedDate().toString())
                        .modifiedDate(map.getModifiedDate().toString())
                        .build();
            voList.add(vo);
        }
        return voList;
    }

    // id로 맵 조회
    public MapVO show(String id) {
        Map map = mapRepository.findById(id).orElse(null);

        return map != null ?
                    MapVO.builder()
                    .id(map.getId())
                    .title(map.getTitle())
                    .location(map.getLocation())
                    .photoId(map.getPhotoId())
                    .ownerId(map.getOwnerId())
                    .serverId(map.getServerId())
                    .description(map.getDescription())
                    .createdDate(map.getCreatedDate().toString())
                    .modifiedDate(map.getModifiedDate().toString())
                    .build()
                : null;
    }

    // 새 맵 추가
    public Map create(MapDto dto) throws IOException {
        // 중복id 존재 시 데이터 추가 x
        if (dto.getId() != null) {
            return null;
        }

        // 파일 id
        String fileId = null;

        // 파일이 있는 경우에만 파일 등록 수행 후 파일 id 가져오기
        if (dto.getPhoto() != null) {
            if (!dto.getPhoto().isEmpty()) {
                fileId = fileService.addFile(dto.getPhoto());
            }
        }

        // 파일 id를 넣은 dto를 entity로 변환
        Map map = dto.toEntity(fileId);

        return mapRepository.save(map);
    }

    // 맵 수정
    public Map update(String id, MapDto dto) throws IOException {
        // 수정 대상
        Map target = mapRepository.findById(id).orElse(null);

        // 잘못된 요청 처리
        if (target == null || !id.equals(dto.getId())) {
            return null;
        }

        // 수정할 파일 id
        MultipartFile file = dto.getPhoto();
        String fileId = target.getPhotoId();

        // 파일 삭제 요청 여부
        if (dto.isFileDeleteFlag() || (file != null && !file.isEmpty())) { // 삭제 요청 있을 때
            // 기존 파일 제거
            fileService.deleteFile(target.getPhotoId());
            fileId = null;

            // 파일이 있는 경우에만 파일 등록 수행 후 파일 id 가져오기
            if (file != null && !file.isEmpty()) {
                fileId = fileService.addFile(file);
            }
        }

        Map map = dto.toEntity(fileId);

        // 기존 데이터에 새 데이터 붙이기
        target.patch(map, dto.isFileDeleteFlag());
        return mapRepository.save(target);
    }


    // 맵 삭제
    public Map delete(String id) {
        Map target = mapRepository.findById(id).orElse(null);

        // 대상이 없으면 잘못된 요청 처리
        if (target == null) {
            return null;
        }

        // 등록된 맵 사진 제거
        if (target.getPhotoId() != null) {
            fileService.deleteFile(target.getPhotoId());
        }

        mapRepository.delete(target);
        return target; // HTTP 응답의 body가 없는 ResponseEntity 생성
    }
}
