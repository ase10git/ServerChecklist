package com.ase.serverckecklist.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    USER_READ("user:read"),
    USER_UPDATE("user:update"),
    USER_CREATE("user:create"),
    USER_DELETE("user:delete"),
    SERVERUSER_READ("serveruser:read"),
    SERVERUSER_UPDATE("serveruser:update"),
    SERVERUSER_CREATE("serveruser:create"),
    SERVERUSER_DELETE("serveruser:delete"),
    SERVERADMIN_READ("serveradmin:read"),
    SERVERADMIN_UPDATE("serveradmin:update"),
    SERVERADMIN_CREATE("serveradmin:create"),
    SERVERADMIN_DELETE("serveradmin:delete"),
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete");

    @Getter
    private final String permission;
}
