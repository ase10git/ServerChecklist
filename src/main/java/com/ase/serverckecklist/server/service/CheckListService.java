package com.ase.serverckecklist.server.service;

import com.ase.serverckecklist.server.dto.CheckListDto;
import com.ase.serverckecklist.server.repository.CheckListRepository;
import com.ase.serverckecklist.server.entity.CheckList;
import com.ase.serverckecklist.server.vo.CheckListVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Slf4j
public class CheckListService {

    private final CheckListRepository checkListRepository;

    // 서버의 모든 체크리스트 전체 조회
    public ArrayList<CheckListVO> index(String serverId) {
        // 체크리스트 리스트
        ArrayList<CheckList> list = checkListRepository.findByServerId(serverId);
        // 결과로 반환할 리스트
        ArrayList<CheckListVO> voList = new ArrayList<>();

        for(CheckList checkList : list) {
            CheckListVO vo = CheckListVO.builder()
                    .id(checkList.getId())
                    .title(checkList.getTitle())
                    .ownerId(checkList.getOwnerId())
                    .serverId(checkList.getServerId())
                    .checked(checkList.getChecked())
                    .createdDate(checkList.getCreatedDate().toString())
                    .modifiedDate(checkList.getModifiedDate().toString())
                    .build();
            voList.add(vo);
        }

        return voList;
    }

    // 가장 최근에 서버에 추가된 메모 상위 6개만 가져오기
    public ArrayList<CheckListVO> recentList(String serverId) {
        // 체크리스트 리스트
        ArrayList<CheckList> list = checkListRepository.findByServerIdOrderByCreatedDateDescModifiedDateDesc(serverId);
        // 결과로 반환할 리스트
        ArrayList<CheckListVO> voList = new ArrayList<>();

        for(CheckList checkList : list) {
            CheckListVO vo = CheckListVO.builder()
                    .id(checkList.getId())
                    .title(checkList.getTitle())
                    .ownerId(checkList.getOwnerId())
                    .serverId(checkList.getServerId())
                    .checked(checkList.getChecked())
                    .createdDate(checkList.getCreatedDate().toString())
                    .modifiedDate(checkList.getModifiedDate().toString())
                    .build();
            voList.add(vo);
        }

        return voList;
    }

    // id로 특정 체크리스트 조회
    public CheckListVO show(@PathVariable String id) {
        CheckList checkList = checkListRepository.findById(id).orElse(null);

        return checkList != null ?
                CheckListVO.builder()
                        .id(checkList.getId())
                        .title(checkList.getTitle())
                        .ownerId(checkList.getOwnerId())
                        .serverId(checkList.getServerId())
                        .checked(checkList.getChecked())
                        .createdDate(checkList.getCreatedDate().toString())
                        .modifiedDate(checkList.getModifiedDate().toString())
                        .build()
                : null;
    }

    // 새 체크리스트 추가
    public CheckList create(CheckListDto dto) {
        CheckList checkList = dto.toEntity();

        if (checkList.getId() != null) { // 중복id 존재 시 데이터 추가 x
            return null;
        }

        return checkListRepository.save(checkList);
    }

    // 체크리스트 수정
    public CheckList update(String id, CheckListDto dto) {
        CheckList checkList = dto.toEntity();

        // 수정 대상
        CheckList target = checkListRepository.findById(id).orElse(null);

        // 잘못된 요청 처리
        if (target == null || !id.equals(checkList.getId())) {
            return null;
        }

        // 기존 데이터에 새 데이터 붙이기
        target.patch(checkList);
        return checkListRepository.save(target);
    }

    // 체크박스 변경하기
    public ArrayList<CheckList> saveChecked(ArrayList<CheckListDto> dtos) {
        // 결과물 배열
        ArrayList<CheckList> list = new ArrayList<>();

        for (CheckListDto dto : dtos) {
            CheckList updated = dto.toEntity();

            // 수정 대상
            CheckList target = checkListRepository.findById(dto.getId()).orElse(null);

            // 타겟이 있는 경우만 체크박스 수정
            if (target != null) {
                target.patch(updated);
                checkListRepository.save(target);
                list.add(target);
            }
        }

        return list;
    }

    // 체크리스트 삭제
    public CheckList delete(String id) {
        CheckList target = checkListRepository.findById(id).orElse(null);

        // 대상이 없으면 잘못된 요청 처리
        if (target == null) {
            return null;
        }

        checkListRepository.delete(target);
        return target; // HTTP 응답의 body가 없는 ResponseEntity 생성
    }
}
