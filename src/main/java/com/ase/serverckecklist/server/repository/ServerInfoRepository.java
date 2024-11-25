package com.ase.serverckecklist.server.repository;

import com.ase.serverckecklist.server.entity.ServerInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerInfoRepository extends MongoRepository<ServerInfo, String> {


}
