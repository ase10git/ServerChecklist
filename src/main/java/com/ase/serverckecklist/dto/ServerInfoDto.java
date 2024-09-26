package com.ase.serverckecklist.dto;

import com.ase.serverckecklist.entity.ServerInfo;
import lombok.Data;

@Data
public class ServerInfoDto {

    private String id;
    private String name;
    private String photo;
    private String usage;
    private String description;
    private String managerId;

    // DTO -> Entity
    public ServerInfo toEntity() {
        // id 유무에 따른 수정/추가 구분
        if (id == null) {
            // 신규 등록
            return new ServerInfo(
                    name,
                    photo,
                    usage,
                    description
            );
        } else {
            // 수정용
            return new ServerInfo(
                    id,
                    name,
                    photo,
                    usage,
                    description
            );
        }
    }
}
