package com.ase.serverckecklist.vo;

import com.ase.serverckecklist.entity.ServerInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServerInfoVO {
    private ServerInfo serverInfo;
    private int numOfMemo;
    private int numOfChecklists;
    private int numOfMaps;
}
