package com.ase.serverckecklist.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;

    private String email;
    private String password;
    private String nickname;
    private String profile;
    private Boolean verification;

    @CreatedDate
    private LocalDateTime registerDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    // constructor
    // 신규용
    public User(String email, String password, String nickname, String profile) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profile = profile;
        this.verification = false;
    }

    // 수정용
    public User(String id, String email, String password, String nickname, String profile) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profile = profile;
    }


    // 데이터 수정
    public void patch(User user) {

        if (user.password != null) {
            this.password = user.password;
        }

        if (user.nickname != null) {
            this.nickname = user.nickname;
        }

        if (user.profile != null) {
            this.profile = user.profile;
        }

        this.modifiedDate = LocalDateTime.now();
    }
}
