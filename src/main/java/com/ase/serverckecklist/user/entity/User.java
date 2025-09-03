package com.ase.serverckecklist.user.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Slf4j
public class User implements UserDetails {

    @Id
    private String id;

    private String email;
    private String password;
    private String nickname;
    private String profile;
    private boolean verification = false;
    @Field
    @JsonFormat(shape = JsonFormat.Shape.STRING) // string 형태로 변환
    private List<Role> role;
    private List<String> joinedServerList = null;
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean enabled = true;

    @CreatedDate
    private LocalDateTime registerDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    // constructor
    // 신규용
    public User(String email, String password, String nickname, List<Role> role) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.role = role;
        this.registerDate = LocalDateTime.now();
        this.modifiedDate = LocalDateTime.now();
    }

    // 수정용 - 사용자 정보
    public User(String email, String nickname, String profile, List<Role> role, List<String> joinedServerList) {
        this.email = email;
        this.nickname = nickname;
        this.profile = profile;
        this.role = role;
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

        if (user.role != null) {
            this.role = user.role;
        }

        if (user.joinedServerList != null) {
            this.joinedServerList = user.joinedServerList;
        }
        this.modifiedDate = LocalDateTime.now();
    }

    // 사용자 프로필 수정용
    public void patch(User user, boolean fileDeleteFlag) {

        if (user.nickname != null) {
            this.nickname = user.nickname;
        }

        if (user.profile != null) {
            this.profile = user.profile;
        } else if (fileDeleteFlag) {
            this.profile = null;
        }

        if (user.role != null) {
            this.role = user.role;
        }
        
        if (user.joinedServerList != null) {
            this.joinedServerList = user.joinedServerList;
        }
        this.modifiedDate = LocalDateTime.now();
    }

    // 이메일 인증 여부 확인
    public boolean isVerified() {
        return this.verification;
    }

    // implements
    // 사용자 권한 확인
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> list = new ArrayList<>();

        for(Role r : role) {
            list.addAll(r.getAuthorities());
        }
        return list;
    }

    // UserDetails에서 사용하는 username을 email로 수정
    @Override
    public String getUsername() {
        return this.email;
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
