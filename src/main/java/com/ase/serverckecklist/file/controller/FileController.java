package com.ase.serverckecklist.file.controller;

import com.ase.serverckecklist.file.dto.LoadFile;
import com.ase.serverckecklist.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    // 파일 다운로드
    private ResponseEntity<ByteArrayResource> sendFile(LoadFile file) throws IOException {
        String filename = URLEncoder.encode(file.getFilename(), StandardCharsets.UTF_8.toString());

        return (file.getFile() != null) ?
                ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(file.getFileType()))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8\""+filename+"\"")
                        .body(new ByteArrayResource(file.getFile()))
                :
                ResponseEntity.notFound().build();
    }
    
    // GET
    // 사용자 프로필 이미지 파일 다운로드하기
    @GetMapping("/user/{email}")
    public ResponseEntity<ByteArrayResource> downloadProfileImage(@PathVariable("email") String email) throws IOException {
        // 사용자 이메일로 프로필 사진 조회
        LoadFile loadFile = fileService.findUserProfile(email);
        
        // file download
        return sendFile(loadFile);
    }
    
    // 서버 이미지 파일 다운로드하기
    @GetMapping("/servers/{id}")
    public ResponseEntity<ByteArrayResource> downloadServerImage(@PathVariable("id") String id) throws IOException {
        // 서버 id로 서버 조회
        LoadFile loadFile = fileService.findServerImage(id);

        // file download
        return sendFile(loadFile);
    }

    // 서버 지도 파일 다운로드하기
    @GetMapping("/maps/{id}")
    public ResponseEntity<ByteArrayResource> downloadMapImage(@PathVariable("id") String id) throws IOException {
        // 지도 id로 지도 조회
        LoadFile loadFile = fileService.findMapImage(id);

        // file download
        return sendFile(loadFile);
    }

}
