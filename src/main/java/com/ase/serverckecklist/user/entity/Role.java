package com.ase.serverckecklist.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum Role {

    USER(
            Set.of(
                    Permission.USER_READ,
                    Permission.USER_UPDATE,
                    Permission.USER_CREATE,
                    Permission.USER_DELETE
            )
    ),
    SERVER_USER(
            Set.of(
                    Permission.USER_READ,
                    Permission.USER_UPDATE,
                    Permission.USER_CREATE,
                    Permission.USER_DELETE,
                    Permission.SERVERUSER_READ,
                    Permission.SERVERUSER_UPDATE,
                    Permission.SERVERUSER_CREATE,
                    Permission.SERVERUSER_DELETE
            )
    ),
    SERVER_ADMIN(
            Set.of(
                    Permission.USER_READ,
                    Permission.USER_UPDATE,
                    Permission.USER_CREATE,
                    Permission.USER_DELETE,
                    Permission.SERVERUSER_READ,
                    Permission.SERVERUSER_UPDATE,
                    Permission.SERVERUSER_CREATE,
                    Permission.SERVERUSER_DELETE,
                    Permission.SERVERADMIN_READ,
                    Permission.SERVERADMIN_UPDATE,
                    Permission.SERVERADMIN_CREATE,
                    Permission.SERVERADMIN_DELETE
            )
    ),
    ADMIN(
            Set.of(
                    Permission.ADMIN_READ,
                    Permission.ADMIN_UPDATE,
                    Permission.ADMIN_CREATE,
                    Permission.ADMIN_DELETE
            )
    );

    @Getter
    private final Set<Permission> permissions;

    // Authorities 가져오기
    // user에 getAuthorities에서도 사용
    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                // spring에서 role = authorities
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());

        // prefix로 ROLE_을 추가한 권한을 마지막에 추가
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
    }
