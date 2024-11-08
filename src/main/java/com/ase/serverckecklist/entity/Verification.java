package com.ase.serverckecklist.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "verification")
@Data
@NoArgsConstructor
public class Verification {

    @Id
    private String id;
    private String email;
    private String code;

    @CreatedDate
    private LocalDateTime createdDate ;

    private LocalDateTime expiredDate;

    public Verification(String email, String code) {
        this.email = email;
        this.code = code;
        this.createdDate = LocalDateTime.now();
        this.expiredDate = createdDate.plusMinutes(15); // 15분 후 만료
    }

    // 코드 만료 확인
    public boolean isCodeExpired() {
        return expiredDate.isAfter(LocalDateTime.now());
    }
}
