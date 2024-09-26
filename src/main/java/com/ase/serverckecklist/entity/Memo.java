package com.ase.serverckecklist.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "memo")
@Data
@NoArgsConstructor
public class Memo {
    @Id
    private String id;

    private String name;
    private String content;
    private String ownerId;
    private String serverId;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    // constructor
    // 신규용
    public Memo(String name, String content, String ownerId, String serverId) {
        this.name = name;
        this.content = content;
        this.ownerId = ownerId;
        this.serverId = serverId;
        this.createdDate = LocalDateTime.now();
        this.modifiedDate = LocalDateTime.now();
    }

    // 수정용
    public Memo(String id, String name, String content) {
        this.id = id;
        this.name = name;
        this.content = content;
    }

    // 데이터 수정
    public void patch(Memo memo) {

        if (name != null) {
            this.name = memo.name;
        }

        if (content != null) {
            this.content = memo.content;
        }

        this.modifiedDate = LocalDateTime.now();
    }
}
