package com.ase.serverckecklist.repository;

import com.ase.serverckecklist.entity.Favorites;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesRepository extends MongoRepository<Favorites, String> {
}
