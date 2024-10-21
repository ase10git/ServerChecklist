package com.ase.serverckecklist.service;

import com.ase.serverckecklist.dto.MemoDto;
import com.ase.serverckecklist.entity.Memo;
import com.ase.serverckecklist.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MemoService {
    private final MemoRepository memoRepository;

    // 서버의 모든 메모 조회
    public ArrayList<Memo> index(String serverId) {
        return memoRepository.findByServerId(serverId);
    }

    // 가장 최근에 서버에 추가된 메모 상위 6개만 가져오기
    public ArrayList<Memo> recentList(String serverId) {
        return memoRepository.findByServerIdOrderByCreatedDateDescModifiedDateDesc(serverId);
    }

    // 서버에 등록된 전체 메모 수 조회
    public int numOfMemo(String serverId) {
        return memoRepository.countByServerId(serverId);
    }

    // 특정 메모 조회
    public Memo show(String id) {
        return memoRepository.findById(id).orElse(null);
    }

    // 새 메모 추가
    public Memo create(MemoDto dto) {
        Memo memo = dto.toEntity();

        if (memo.getId() != null) { // 중복id 존재 시 데이터 추가 x
            return null;
        }

        return memoRepository.save(memo);
    }

    // 메모 수정
    public Memo update(String id, MemoDto dto) {
        Memo memo = dto.toEntity();

        // 수정 대상
        Memo target = memoRepository.findById(id).orElse(null);

        // 잘못된 요청 처리
        if (target == null || !id.equals(memo.getId())) {
            return null;
        }

        // 기존 데이터에 새 데이터 붙이기
        target.patch(memo);
        return memoRepository.save(target);
    }


    // 메모 삭제
    public Memo delete(String id) {
        Memo target = memoRepository.findById(id).orElse(null);

        // 대상이 없으면 잘못된 요청 처리
        if (target == null) {
            return null;
        }

        memoRepository.delete(target);
        return target; // HTTP 응답의 body가 없는 ResponseEntity 생성
    }
}
