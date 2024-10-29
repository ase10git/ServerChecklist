package com.ase.serverckecklist.dto;

import com.ase.serverckecklist.entity.Map;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class MapDto {

    private String id;

    private String title;
    private String location;
    private MultipartFile photo;
    private String ownerId;
    private String serverId;
    private String description;
    private boolean fileDeleteFlag = false;

    // DTO -> Entity
    public Map toEntity(String photoId) {
        if (id == null) {
            // 신규 등록
            return new Map(
                    title,
                    location,
                    photoId,
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
                    photoId,
                    ownerId,
                    serverId,
                    description
            );
        }
    }
}
