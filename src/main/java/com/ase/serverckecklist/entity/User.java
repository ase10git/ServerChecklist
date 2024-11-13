package com.ase.serverckecklist.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    private String id;

    private String email;
    private String password;
    private String nickname;
    private String profile;
    private boolean verification = false;
    private String[] roles;
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean enabled = true;

    @CreatedDate
    private LocalDateTime registerDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    private String joinedServerList;

    // constructor
    // 신규용
    public User(String email, String password, String nickname, String[] roles) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.roles = roles;
    }

    // 수정용
    public User(String id, String email, String password, String nickname, String profile, String[] roles, String joinedServerList) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profile = profile;
        this.roles = roles;
        this.joinedServerList = joinedServerList;
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

        if (user.joinedServerList != null) {
            this.joinedServerList = user.joinedServerList;
        }
        this.modifiedDate = LocalDateTime.now();
    }

    // 사용자 권한 확인
    public String[] getUsersRole() {
        return this.roles;
    }

    // 이메일 인증 여부 확인
    public boolean isVerified() {
        return this.verification;
    }

    // implements
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.nickname;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
