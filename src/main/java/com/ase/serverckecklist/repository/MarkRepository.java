package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.Mark;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkRepository extends MongoRepository<Mark, String> {
}
