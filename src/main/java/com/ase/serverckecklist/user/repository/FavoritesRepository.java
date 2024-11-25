package com.ase.serverckecklist.user.repository;

import com.ase.serverckecklist.user.entity.Favorites;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesRepository extends MongoRepository<Favorites, String> {

    // 사용자 id로 즐겨찾기 가져오기
    public Favorites findByOwnerId(String ownerId);
}
