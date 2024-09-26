package com.ase.serverckecklist.dto;

import com.ase.serverckecklist.entity.Map;
import lombok.Data;

@Data
public class MapDto {

    private String id;

    private String title;
    private String location;
    private String photo;
    private String ownerId;
    private String serverId;
    private String description;

    // DTO -> Entity
    public Map toEntity() {
        if (id == null) {
            // 신규 등록
            return new Map(
                    title,
                    location,
                    photo,
                    ownerId,
                    serverId,
                    description
            );
        } else {
            // 수정용
            return new Map(
                    id,
                    title,
                    location,
                    photo,
                    ownerId,
                    serverId,
                    description
            );
        }
    }
}
