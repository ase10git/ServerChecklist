package com.ase.serverckecklist.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mark")
@Data
@NoArgsConstructor
public class Favorites {

    @Id
    private String id;

    private String ownerId;
    private String serverList;
    private String checklist;
    private String mapList;
    private String memoList;

    // constructor
    // 생성용
    public Favorites(String ownerId) {
        this.ownerId = ownerId;
    }

    // 수정용
    public Favorites(String id, String ownerId, String serverList, String checklist, String mapList, String memoList) {
        this.id = id;
        this.ownerId = ownerId;
        this.serverList = serverList;
        this.checklist = checklist;
        this.mapList = mapList;
        this.memoList = memoList;
    }

    // 데이터 수정용
    public void patch(Favorites favorites) {

        if (favorites.serverList != null) {
            this.serverList = favorites.serverList;
        }

        if (favorites.checklist != null) {
            this.checklist = favorites.checklist;
        }

        if (favorites.mapList != null) {
            this.mapList = favorites.mapList;
        }

        if (favorites.memoList != null) {
            this.memoList = favorites.memoList;
        }
    }
}
