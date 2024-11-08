package com.ase.serverckecklist.security.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class SecurityProperties {

    @Value("${app.security.secret-key}")
    private String secretKey;

}
