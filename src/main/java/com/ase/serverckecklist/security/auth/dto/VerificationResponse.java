package com.ase.serverckecklist.security.auth.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerificationResponse {

    private boolean isVerified;
    private String result;
}
