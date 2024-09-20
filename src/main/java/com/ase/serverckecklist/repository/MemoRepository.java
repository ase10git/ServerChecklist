package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.Memo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoRepository extends MongoRepository<Memo, String> {

}
