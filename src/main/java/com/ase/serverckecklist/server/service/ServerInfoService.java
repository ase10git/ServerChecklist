package com.ase.serverckecklist.server.service;

import com.ase.serverckecklist.server.dto.ServerInfoDto;
import com.ase.serverckecklist.server.entity.ServerInfo;
import com.ase.serverckecklist.server.repository.CheckListRepository;
import com.ase.serverckecklist.server.repository.MapRepository;
import com.ase.serverckecklist.server.repository.MemoRepository;
import com.ase.serverckecklist.server.repository.ServerInfoRepository;
import com.ase.serverckecklist.server.vo.ServerInfoVO;
import com.ase.serverckecklist.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ServerInfoService {

    private final ServerInfoRepository serverInfoRepository;
    private final MemoRepository memoRepository;
    private final CheckListRepository checkListRepository;
    private final MapRepository mapRepository;
    private final FileService fileService;

    // 서버 전체 조회
    public ArrayList<ServerInfoVO> index() {
        // 서버 정보들을 담은 VO 리스트
        ArrayList<ServerInfoVO> list = new ArrayList<>();

        // 서버 정보 리스트
        ArrayList<ServerInfo> serverList = (ArrayList<ServerInfo>) serverInfoRepository.findAll();

        for (ServerInfo serverInfo : serverList) {
            // 서버 정보, 사진, 각 서버의 메모, 체크리스트, 맵 수를 저장한 VO 생성
            ServerInfoVO vo = ServerInfoVO.builder()
                        .id(serverInfo.getId())
                        .name(serverInfo.getName())
                        .photoId(serverInfo.getPhotoId())
                        .usage(serverInfo.getUsage())
                        .description(serverInfo.getDescription())
                        .managerId(serverInfo.getManagerId())
                        .createdDate(serverInfo.getCreatedDate().toString())
                        .modifiedDate(serverInfo.getModifiedDate().toString())
                        .numOfMemo(memoRepository.countByServerId(serverInfo.getId()))
                        .numOfChecklists(checkListRepository.countByServerId(serverInfo.getId()))
                        .numOfMaps(mapRepository.countByServerId(serverInfo.getId()))
                    .build();
            // 리스트에 저장
            list.add(vo);
        }

        return list;
    }

    // id로 서버 조회
    public ServerInfoVO show(String id) {
        ServerInfo info = serverInfoRepository.findById(id).orElse(null);

        return info != null ?
                ServerInfoVO.builder()
                    .id(info.getId())
                        .name(info.getName())
                        .photoId(info.getPhotoId())
                        .usage(info.getUsage())
                        .description(info.getDescription())
                        .managerId(info.getManagerId())
                        .createdDate(info.getCreatedDate().toString())
                        .modifiedDate(info.getModifiedDate().toString())
                    .build()
                : null;
    }

    // 새 서버 추가
    public ServerInfo create(ServerInfoDto dto) throws IOException {
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
        ServerInfo serverInfo = dto.toEntity(fileId);

        return serverInfoRepository.save(serverInfo);
    }

    // 서버 수정
    public ServerInfo update(String id, ServerInfoDto dto) throws IOException {
        // 수정 대상
        ServerInfo target = serverInfoRepository.findById(id).orElse(null);

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

        ServerInfo serverInfo = dto.toEntity(fileId);

        // 기존 데이터에 새 데이터 붙이기
        target.patch(serverInfo, dto.isFileDeleteFlag());
        return serverInfoRepository.save(target);
    }


    // 서버 삭제
    public ServerInfo delete(String id) {
        ServerInfo target = serverInfoRepository.findById(id).orElse(null);

        // 대상이 없으면 잘못된 요청 처리
        if (target == null) {
            return null;
        }

        // 서버에 등록된 사진 제거
        if (target.getPhotoId() != null) {
            fileService.deleteFile(target.getPhotoId());
        }

        serverInfoRepository.delete(target);
        return target; // HTTP 응답의 body가 없는 ResponseEntity 생성
    }
}
