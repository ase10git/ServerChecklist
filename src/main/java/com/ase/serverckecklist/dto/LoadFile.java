package com.ase.serverckecklist.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoadFile {
    private String filename;
    private String fileType;
    private String fileSize;
    private byte[] file;
}
