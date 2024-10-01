package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.Memo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface MemoRepository extends MongoRepository<Memo, String> {

    public ArrayList<Memo> findByServerId(String serverId);
}
