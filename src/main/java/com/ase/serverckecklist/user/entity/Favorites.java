package com.ase.serverckecklist.user.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "mark")
@Data
@NoArgsConstructor
public class Favorites {

    @Id
    private String id;

    private String ownerId;
    private List<String> serverList;
    private List<String> checklist;
    private List<String> mapList;
    private List<String> memoList;

    // constructor
    // 생성용
    public Favorites(String ownerId) {
        this.ownerId = ownerId;
    }

    // 수정용
    public Favorites(String id, String ownerId, List<String> serverList, List<String> checklist, List<String> mapList, List<String> memoList) {
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
