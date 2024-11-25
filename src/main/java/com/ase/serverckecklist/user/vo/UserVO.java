package com.ase.serverckecklist.user.vo;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserVO {

    private String email;
    private String nickname;
    private String profile;
    private boolean verification;
    private String registerDate;
    private String modifiedDate;
    private String joinedServerList;
}
