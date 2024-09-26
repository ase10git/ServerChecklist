package com.ase.serverckecklist.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "maps")
@Data
@NoArgsConstructor
public class Map {

    @Id
    private String id;

    private String title;
    private String location;
    private String photo;
    private String ownerId;
    private String serverId;
    private String description;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    // constructor
    // 생성용
    public Map(String title, String location, String photo, String ownerId, String serverId, String description) {
        this.title = title;
        this.location = location;
        this.photo = photo;
        this.ownerId = ownerId;
        this.serverId = serverId;
        this.description = description;
        this.createdDate = LocalDateTime.now();
        this.modifiedDate = LocalDateTime.now();
    }

    // 수정용
    public Map(String id, String title, String location, String photo, String ownerId, String serverId, String description) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.photo = photo;
        this.ownerId = ownerId;
        this.serverId = serverId;
        this.description = description;
    }

    // 데이터 수정
    public void patch(Map map) {

        if (title != null) {
            this.title = map.title;
        }

        if (location != null) {
            this.location = map.location;
        }

        if (photo != null) {
            this.photo = map.photo;
        }

        if (description != null) {
            this.description = map.description;
        }

        this.modifiedDate = LocalDateTime.now();
    }
}
