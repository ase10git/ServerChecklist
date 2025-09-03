package com.ase.serverckecklist.server.vo;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MapVO {

    private String id;
    private String title;
    private String location;
    private String photoId;
    private String ownerId;
    private String ownerNickname;
    private String serverId;
    private String description;
    private String createdDate;
    private String modifiedDate;
}
