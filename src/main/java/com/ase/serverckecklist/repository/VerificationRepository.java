package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.Verification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationRepository extends MongoRepository<Verification, String> {

    // email로 인증코드 찾기
    public Verification findByEmail(String email);
}
