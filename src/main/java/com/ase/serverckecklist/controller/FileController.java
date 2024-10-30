package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.dto.LoadFile;
import com.ase.serverckecklist.service.FileService;
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

    // GET
    // 파일 다운로드하기
    @GetMapping("{id}")
    public ResponseEntity<ByteArrayResource> download(@PathVariable("id") String id) throws IOException {
        LoadFile loadFile = fileService.downloadFile(id);
        String filename = URLEncoder.encode(loadFile.getFilename(), StandardCharsets.UTF_8.toString());

        return (loadFile.getFile() != null) ?
                ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(loadFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8\""+filename+"\"")
                .body(new ByteArrayResource(loadFile.getFile()))
                :
                ResponseEntity.notFound().build();
    }

    // POST
    // 파일 업로드하기
    /*
    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws IOException {
        // 응답의 body에 파일 id를 넣어 전송
        return new ResponseEntity<>(fileService.addFile(file), HttpStatus.OK);
    }
    */
}
