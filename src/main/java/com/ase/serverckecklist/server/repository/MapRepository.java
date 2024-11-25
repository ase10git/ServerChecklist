package com.ase.serverckecklist.server.repository;

import com.ase.serverckecklist.server.entity.Map;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface MapRepository extends MongoRepository<Map, String> {

    // 서버 id로 맵 전체 가져오기
    public ArrayList<Map> findByServerId(String serverId);

    // 특정 서버의 지도 중 최신 등록 순 상위 6개 가져오기
    ArrayList<Map> findByServerIdOrderByCreatedDateDescModifiedDateDesc(String serverId);

    // 서버 전체에 등록된 맵 수 가져오기
    int countByServerId(String serverId);

}
