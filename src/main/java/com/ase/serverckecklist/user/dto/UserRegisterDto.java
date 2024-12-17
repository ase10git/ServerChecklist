package com.ase.serverckecklist.user.dto;

import com.ase.serverckecklist.user.entity.Role;
import com.ase.serverckecklist.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterDto {
    private String email;
    private String password;
    private String nickname;
    private Role role;

    // DTO -> Entity
    public User toEntity() {
        // 신규 등록
        return new User(
                email,
                password,
                nickname,
                role
        );
    }
}
