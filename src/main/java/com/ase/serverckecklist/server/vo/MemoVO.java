package com.ase.serverckecklist.server.vo;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemoVO {

    private String id;
    private String name;
    private String content;
    private String ownerId;
    private String ownerNickname;
    private String serverId;
    private String createdDate;
    private String modifiedDate;
}
