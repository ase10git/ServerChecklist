package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    // 이메일로 사용자 조회
    // Optional : 값이 있을수도 없을 수도 있는 null로 인한
    // NullPointerException을 방지할 수 있는 Java 8 클래스
    Optional<User> findByEmail(String email);
}
