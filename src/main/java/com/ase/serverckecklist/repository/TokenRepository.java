package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends MongoRepository<Token, String> {


    // Refresh Token으로 검색
    Optional<Token> findByRefreshToken(String token);

    // 사용자로 Refresh Token 검색
    List<Token> findAllByEmail(String email);
}
