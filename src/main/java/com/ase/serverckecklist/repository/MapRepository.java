package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.Map;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface MapRepository extends MongoRepository<Map, String> {

    // 서버 id로 맵 전체 가져오기
    public ArrayList<Map> findByServerId(String serverId);

    // 서버 전체에 등록된 맵 수 가져오기
    int countByServerId(String serverId);
}
