package com.ase.serverckecklist.server.dto;

import com.ase.serverckecklist.server.entity.ServerInfo;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ServerInfoDto {

    private String id;
    private String name;
    private MultipartFile photo;
    private String usage;
    private String description;
    private String managerId;
    private boolean fileDeleteFlag = false;

    // DTO -> Entity
    public ServerInfo toEntity(String photoId) {
        // id 유무에 따른 수정/추가 구분
        if (id == null) {
            // 신규 등록
            return new ServerInfo(
                    name,
                    photoId,
                    usage,
                    description,
                    managerId
            );
        } else {
            // 수정용
            return new ServerInfo(
                    id,
                    name,
                    photoId,
                    usage,
                    description,
                    managerId
            );
        }
    }
}
