package com.ase.serverckecklist.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
@RequiredArgsConstructor
public class RandomString {

    private final SecurityProperties securityProperties;

    private String code;
    private final int length = 8;

    public String getCode() {
        StringBuilder builder = new StringBuilder();
        String pallet = securityProperties.getPallet();
        int palletLength = pallet.length();

        for (int i = 0; i < length; i++) {
            builder.append(
                    pallet.charAt(
                            new Random().nextInt(palletLength)
                    )
            );
        }

        this.code = builder.toString();

        return this.code;
    }
}
