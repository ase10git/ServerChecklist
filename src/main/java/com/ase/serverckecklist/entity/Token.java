package com.ase.serverckecklist.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "token")
@Data
@Builder // for Object building
@NoArgsConstructor
@AllArgsConstructor
public class Token {

    @Id
    private String refreshToken;
    private String email;
}
