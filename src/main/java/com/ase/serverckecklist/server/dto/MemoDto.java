package com.ase.serverckecklist.server.dto;

import com.ase.serverckecklist.server.entity.Memo;
import lombok.Data;

@Data
public class MemoDto {

    private String id;
    private String name;
    private String content;
    private String ownerId;
    private String serverId;

    // DTO -> Entity
    public Memo toEntity() {
        if (id == null) {
            // 신규 등록
            return new Memo(
                    name,
                    content,
                    ownerId,
                    serverId
            );
        } else {
            // 수정용
            return new Memo(
                    id,
                    name,
                    content
            );
        }
    }
}
