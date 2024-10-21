package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.Memo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface MemoRepository extends MongoRepository<Memo, String> {

    // 서버 id로 메모 전체 가져오기
    ArrayList<Memo> findByServerId(String serverId);

    // 특정 서버의 메모 중 최신 등록 순 상위 6개 가져오기
    ArrayList<Memo> findByServerIdOrderByCreatedDateDescModifiedDateDesc(String serverId);

    // 서버 전체에 등록된 메모 수 가져오기
    int countByServerId(String serverId);
}
