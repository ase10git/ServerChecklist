package com.ase.serverckecklist.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mark")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mark {

    @Id
    private String id;

    private String targetId;
    private String ownerId;
}