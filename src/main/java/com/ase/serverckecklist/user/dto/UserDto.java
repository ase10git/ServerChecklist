package com.ase.serverckecklist.user.dto;

import com.ase.serverckecklist.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String id;

    private String email;
    private String password;
    private String nickname;
    private String profile;
    private String[] roles;
    private String[] joinedServerList;

    // DTO -> Entity
    public User toEntity() {
        // id 유무에 따른 수정/추가 구분
        if (id == null) {
            // 신규 등록
            return new User(
                    email,
                    password,
                    nickname,
                    roles
            );
        } else {
            // 수정용
            return new User(
                    id,
                    email,
                    password,
                    nickname,
                    profile,
                    roles,
                    joinedServerList
            );
        }
    }
}
