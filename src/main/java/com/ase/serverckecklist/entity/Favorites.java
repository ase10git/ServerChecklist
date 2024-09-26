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
public class Favorites {

    @Id
    private String id;

    private String ownerId;
    private String serverList;
    private String checklist;
    private String mapList;
    private String memoList;
}
