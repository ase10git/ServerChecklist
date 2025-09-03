package com.ase.serverckecklist.security.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class SecurityProperties {

    @Value("${app.security.secret-key}")
    private String secretKey;

    @Value("${app.string-pallet}")
    private String pallet;

    private String emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

    private String passwordRegex = "^\\S+(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&()_~\\[\\]\\+]).{8,20}\\S+$";

    private String nameRegex = "^[가-힣\\w\\d]{2,13}$";
}
