package com.ase.serverckecklist.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "serverinfo")
@Data
@NoArgsConstructor
public class ServerInfo {

    @Id
    private String id;

    private String name;
    private String photo;
    private String usage;
    private String description;
    private String managerId;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    // constructor

    // 신규 등록용
    public ServerInfo(String name, String photo, String usage, String description) {
        this.name = name;
        this.photo = photo;
        this.usage = usage;
        this.description = description;
        this.createdDate = LocalDateTime.now();
        this.modifiedDate = LocalDateTime.now();
        this.managerId = "";
    }

    // 수정용
    public ServerInfo(String id, String name, String photo, String usage, String description) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.usage = usage;
        this.description = description;
    }

    // 데이터 수정
    public void patch(ServerInfo serverInfo) {

        if (name != null) {
            this.name = serverInfo.name;
        }

        if (photo != null) {
            this.photo = serverInfo.photo;
        }

        if (usage != null) {
            this.usage = serverInfo.usage;
        }

        if (description != null) {
            this.description = serverInfo.description;
        }

        this.modifiedDate = LocalDateTime.now();
    }
}
