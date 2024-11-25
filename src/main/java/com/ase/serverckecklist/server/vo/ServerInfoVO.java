package com.ase.serverckecklist.server.vo;

import com.ase.serverckecklist.server.entity.ServerInfo;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServerInfoVO {
    private ServerInfo serverInfo;
    private int numOfMemo;
    private int numOfChecklists;
    private int numOfMaps;
}
