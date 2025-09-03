package com.ase.serverckecklist.server.vo;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CheckListVO {

    private String id;
    private String title;
    private String ownerId;
    private String ownerNickname;
    private String serverId;
    private Boolean checked;
    private String createdDate;
    private String modifiedDate;
}
