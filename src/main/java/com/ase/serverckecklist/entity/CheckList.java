package com.ase.serverckecklist.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
}
