package com.ase.serverckecklist.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "servernotes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Memo {
    @Id
    private String id;

    private String name;
    private String content;
    private String ownerId;
}
