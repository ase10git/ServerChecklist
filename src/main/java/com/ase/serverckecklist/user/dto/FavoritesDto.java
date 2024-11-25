package com.ase.serverckecklist.user.dto;

import com.ase.serverckecklist.user.entity.Favorites;
import lombok.Data;

import java.util.List;

@Data
public class FavoritesDto {

    private String id;
    private String ownerId;
    private List<String> serverList;
    private List<String> checklist;
    private List<String> mapList;
    private List<String> memoList;

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
