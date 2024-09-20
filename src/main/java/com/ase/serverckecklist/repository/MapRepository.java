package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.Map;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapRepository extends MongoRepository<Map, String> {
}
