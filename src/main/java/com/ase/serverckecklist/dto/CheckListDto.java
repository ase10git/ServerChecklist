package com.ase.serverckecklist.dto;

import com.ase.serverckecklist.entity.CheckList;
import lombok.Data;

@Data
public class CheckListDto {

    private String id;

    private String title;
    private String ownerId;
    private String serverId;
    private Boolean checked;

    // DTO -> Entity
    public CheckList toEntity() {
        // id 유무에 따른 수정/추가 구분
        if (id == null) {
            // 신규 등록
            return new CheckList(
                    title,
                    ownerId,
                    serverId,
                    checked
            );
        } else {
            // 수정용
            return new CheckList(
                    id,
                    title,
                    checked
            );
        }
    }
}
