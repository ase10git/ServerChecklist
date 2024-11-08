package com.ase.serverckecklist.security.auth;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerificationResponse {

    private boolean isVerified;
    private String result;
}
