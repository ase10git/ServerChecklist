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
public class UserPwdDto {

    private String email;
    private String currentPassword;
    private String newPassword;

    public User toEntity(String encodedPassword) {
        return User.builder()
                .email(this.email)
                .password(encodedPassword)
                .build();
    }
}
