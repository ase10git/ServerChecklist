package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TokenRepository extends MongoRepository<Token, String> {

    Optional<Token> findByRefreshToken(String token);
}
