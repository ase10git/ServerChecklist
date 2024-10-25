package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.dto.LoadFile;
import com.ase.serverckecklist.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("file")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    // GET
    // 파일 다운로드하기
    @GetMapping("/download/{id}")
    public ResponseEntity<ByteArrayResource> download(@PathVariable("id") String id) throws IOException {
        LoadFile loadFile = fileService.downloadFile(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(loadFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+loadFile.getFilename()+"\"")
                .body(new ByteArrayResource(loadFile.getFile()));
    }


    // POST
    // 파일 업로드하기
    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file")MultipartFile file) throws IOException {
        // 응답의 body에 파일 id를 넣어 전송
        return new ResponseEntity<>(fileService.addFile(file), HttpStatus.OK);
    }
}
