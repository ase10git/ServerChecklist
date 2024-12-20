package com.ase.serverckecklist.server.vo;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServerInfoVO {

    private String id;
    private String name;
    private String photoId;
    private String usage;
    private String description;
    private String managerId;
    private String managerNickname;
    private String createdDate;
    private String modifiedDate;
    private int numOfMemo;
    private int numOfChecklists;
    private int numOfMaps;

}
