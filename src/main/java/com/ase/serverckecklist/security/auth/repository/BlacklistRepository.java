package com.ase.serverckecklist.security.auth.repository;

import com.ase.serverckecklist.security.auth.entity.Blacklist;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BlacklistRepository extends MongoRepository<Blacklist, Integer> {
    // Access Token으로 검색
    Optional<Blacklist> findByAccessToken(String token);
}
