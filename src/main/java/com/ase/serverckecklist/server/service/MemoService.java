package com.ase.serverckecklist.server.service;

import com.ase.serverckecklist.server.dto.MemoDto;
import com.ase.serverckecklist.server.entity.Memo;
import com.ase.serverckecklist.server.repository.MemoRepository;
import com.ase.serverckecklist.server.vo.MemoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MemoService {
    private final MemoRepository memoRepository;

    // 서버의 모든 메모 조회
    public ArrayList<MemoVO> index(String serverId) {
        // 메모 리스트
        ArrayList<Memo> list = memoRepository.findByServerId(serverId);
        // 요청에 보낼 리스트
        ArrayList<MemoVO> voList = new ArrayList<>();

        // Memo -> MemoVO 변환
        for (Memo memo : list) {
            MemoVO vo = MemoVO.builder()
                    .id(memo.getId())
                    .name(memo.getName())
                    .content(memo.getContent())
                    .ownerId(memo.getOwnerId())
                    .serverId(memo.getServerId())
                    .createdDate(memo.getCreatedDate().toString())
                    .modifiedDate(memo.getModifiedDate().toString())
                    .build();
            voList.add(vo);
        }
        return voList;
    }

    // 가장 최근에 서버에 추가된 메모 상위 6개만 가져오기
    public ArrayList<MemoVO> recentList(String serverId) {
        // 메모 리스트
        ArrayList<Memo> list = memoRepository.findTop6ByServerIdOrderByCreatedDateDescModifiedDateDesc(serverId);
        // 요청에 보낼 리스트
        ArrayList<MemoVO> voList = new ArrayList<>();

        // Memo -> MemoVO 변환
        for (Memo memo : list) {
            MemoVO vo = MemoVO.builder()
                    .id(memo.getId())
                    .name(memo.getName())
                    .content(memo.getContent())
                    .ownerId(memo.getOwnerId())
                    .serverId(memo.getServerId())
                    .createdDate(memo.getCreatedDate().toString())
                    .modifiedDate(memo.getModifiedDate().toString())
                    .build();
            voList.add(vo);
        }
        return voList;
    }

    // 서버에 등록된 전체 메모 수 조회
    public int numOfMemo(String serverId) {
        return memoRepository.countByServerId(serverId);
    }

    // 특정 메모 조회
    public MemoVO show(String id) {
        Memo memo = memoRepository.findById(id).orElse(null);

        return memo != null ?
                MemoVO.builder()
                    .id(memo.getId())
                    .name(memo.getName())
                    .content(memo.getContent())
                    .ownerId(memo.getOwnerId())
                    .serverId(memo.getServerId())
                    .createdDate(memo.getCreatedDate().toString())
                    .modifiedDate(memo.getModifiedDate().toString())
                    .build()
                : null;
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
