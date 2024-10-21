package com.ase.serverckecklist.dto;

import com.ase.serverckecklist.entity.Favorites;
import lombok.Data;

@Data
public class FavoritesDto {

    private String id;
    private String ownerId;
    private String serverList;
    private String checklist;
    private String mapList;
    private String memoList;

    // DTO -> Entity
    public Favorites toEntity() {
        return new Favorites(
                id,
                ownerId,
                serverList,
                checklist,
                mapList,
                memoList
        );
    }
}
