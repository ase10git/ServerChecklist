package com.ase.serverckecklist.user.dto;

import com.ase.serverckecklist.user.entity.Role;
import com.ase.serverckecklist.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {
    private String email;
    private String nickname;
    private MultipartFile profile;
    private Role role;
    private String[] joinedServerList;
    private boolean fileDeleteFlag = false;

    // DTO -> Entity
    public User toEntity(String photoId) {
        // 수정용
        return new User(
                email,
                nickname,
                photoId,
                role,
                joinedServerList
        );
    }
}
