package com.ase.serverckecklist.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "serverinfo")
@Data
public class ServerInfo {

    @Id
    private String id;

    private String name;
    private String photo;
    private String usage;
    private String description;
}
