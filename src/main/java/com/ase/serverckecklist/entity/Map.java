package com.ase.serverckecklist.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "map")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Map {

    @Id
    private String id;

    private String title;
    private String location;
    private String photo;
    private String ownerId;
    private String description;
}
