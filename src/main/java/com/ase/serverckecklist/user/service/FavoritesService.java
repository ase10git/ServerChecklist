package com.ase.serverckecklist.user.service;

import com.ase.serverckecklist.user.dto.FavoritesDto;
import com.ase.serverckecklist.user.entity.Favorites;
import com.ase.serverckecklist.user.repository.FavoritesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FavoritesService {

    private final FavoritesRepository favoritesRepository;

    // 사용자 id로 즐겨찾기 조회
    public Favorites show(String ownerId) {
        return favoritesRepository.findByOwnerId(ownerId);
    }

    // 새 즐겨찾기 추가
    public Favorites create(String ownerId) {
        Favorites favorites = new Favorites(ownerId);
        return favoritesRepository.save(favorites);
    }

    // 즐겨찾기 내용 수정
    public Favorites update(String id, FavoritesDto dto) {
        Favorites favorites = dto.toEntity();

        // 수정 대상
        Favorites target = favoritesRepository.findById(id).orElse(null);

        // 잘못된 요청 처리
        if (target == null || !id.equals(favorites.getId())) {
            return null;
        }

        // 기존 데이터에 새 데이터 붙이기
        target.patch(favorites);
        return favoritesRepository.save(target);
    }

    // 즐겨찾기 삭제
    public Favorites delete(String id) {
        Favorites target = favoritesRepository.findById(id).orElse(null);
        
        // 대상이 없으면 잘못된 요청 처리
        if (target == null) {
            return null;
        }
        
        favoritesRepository.delete(target);
        return target; // HTTP 응답의 body가 없는 ResponseEntity 생성
    }
}
