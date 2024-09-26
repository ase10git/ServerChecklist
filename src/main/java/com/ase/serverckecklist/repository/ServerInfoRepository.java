package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.ServerInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerInfoRepository extends MongoRepository<ServerInfo, String> {


}
