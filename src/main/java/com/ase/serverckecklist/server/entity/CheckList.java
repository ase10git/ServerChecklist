package com.ase.serverckecklist.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "checklist")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckList {

    @Id
    private String id;

    private String title;
    private String ownerId;
    private String serverId;
    private Boolean checked;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    // constructor
    // 신규용
    public CheckList(String title, String ownerId, String serverId) {
        this.title = title;
        this.ownerId = ownerId;
        this.serverId = serverId;
        this.checked = false;
        this.createdDate = LocalDateTime.now();
        this.modifiedDate = LocalDateTime.now();
    }

    // 수정용
    public CheckList(String id, String title, Boolean checked) {
        this.id = id;
        this.title = title;
        this.checked = checked;
    }

    // 데이터 수정
    public void patch(CheckList checkList) {

        if (checkList.title != null && !checkList.title.isEmpty()) {
            this.title = checkList.title;
        }

        if (checkList.checked != null) {
            this.checked = checkList.checked;
        }

        this.modifiedDate = LocalDateTime.now();
    }
}
