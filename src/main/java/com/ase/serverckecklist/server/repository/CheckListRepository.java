package com.ase.serverckecklist.server.repository;

import com.ase.serverckecklist.server.entity.CheckList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CheckListRepository extends MongoRepository<CheckList, String> {

    // 서버 id로 체크리스트 전체 가져오기
    public ArrayList<CheckList> findByServerId(String serverId);

    // 특정 서버의 메모 중 최신 등록 순 상위 6개 가져오기
    ArrayList<CheckList> findByServerIdOrderByCreatedDateDescModifiedDateDesc(String serverId);

    // 서버 전체에 등록된 체크리스트 수 가져오기
    int countByServerId(String serverId);
}
