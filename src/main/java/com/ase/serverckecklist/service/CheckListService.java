package com.ase.serverckecklist.service;

import com.ase.serverckecklist.dto.CheckListDto;
import com.ase.serverckecklist.entity.CheckList;
import com.ase.serverckecklist.repository.CheckListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CheckListService {

    private final CheckListRepository checkListRepository;

    // 서버의 모든 체크리스트 전체 조회
    public ArrayList<CheckList> index(String serverId) {
        return checkListRepository.findByServerId(serverId);
    }

    // 가장 최근에 서버에 추가된 메모 상위 6개만 가져오기
    public ArrayList<CheckList> recentList(String serverId) {
        return checkListRepository.findByServerIdOrderByCreatedDateDescModifiedDateDesc(serverId);
    }

    // id로 특정 체크리스트 조회
    public CheckList show(@PathVariable String id) {
        return checkListRepository.findById(id).orElse(null);
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
