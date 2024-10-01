package com.ase.serverckecklist.service;

import com.ase.serverckecklist.dto.MemoDto;
import com.ase.serverckecklist.entity.Memo;
import com.ase.serverckecklist.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MemoService {
    private final MemoRepository memoRepository;

    // 서버의 모든 메모 조회
    public ArrayList<Memo> index(String serverId) { // 매개변수로 서버 id 추가, 메소드 추가!!!
        return memoRepository.findByServerId(serverId);
    }

    // 특정 메모 조회
    public Memo show(@PathVariable String id) {
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
