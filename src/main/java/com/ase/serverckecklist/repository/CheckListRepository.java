package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.CheckList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckListRepository extends MongoRepository<CheckList, String> {
}
