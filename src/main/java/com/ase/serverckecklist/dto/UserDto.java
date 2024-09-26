package com.ase.serverckecklist.dto;

import com.ase.serverckecklist.entity.User;
import lombok.Data;

@Data
public class UserDto {
    private String id;

    private String email;
    private String password;
    private String nickname;
    private String profile;

    // DTO -> Entity
    public User toEntity() {
        // id 유무에 따른 수정/추가 구분
        if (id == null) {
            // 신규 등록
            return new User(
                    email,
                    password,
                    nickname,
                    profile
            );
        } else {
            // 수정용
            return new User(
                    id,
                    email,
                    password,
                    nickname,
                    profile
            );
        }
    }
}
