package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.storage.StorageFileNotFoundException;
import com.ase.serverckecklist.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class FileUploadController {
    // controller from https://spring.io/guides/gs/uploading-files

    private final StorageService storageService;

    // GET
    // 파일 전체 가져오기 및 파일 다운로드
    @GetMapping("/")
    public String listUpoadedFiles(Model model) throws IOException {
        // Model을 사용하여 파일 정보를 같이 보내줌
        // MvcUriComponentsBuilder : 파일을 다운로드할 수 있는 URI를 생성
        model.addAttribute("files",
                storageService.loadAll().
                        map(path -> MvcUriComponentsBuilder.fromMethodName(
                                FileUploadController.class,
                                "serveFile", // 아래의 메소드를 통해 다운로드
                                path.getFileName().toString())
                                .build().toUri().toString())
                        .collect(Collectors.toList()));

        return "uploadForm";
    }

    // 특정 파일 다운로드하기
    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable("filename") String filename) {
        Resource file = storageService.loadAsResource(filename);

        // 파일 이름과 일치하는 리소스가 없으면 파일을 못 찾는다는 응답을 반환
        if (file == null) {
            return ResponseEntity.notFound().build();
        }

        // 파일이 존재하면 HTTP 응답 헤더에 파일 다운로드 방식을 설정
        // CONTENT_DISPOSITION : 브라우저가 서버에서 전송된 파일을 어떻게 처리할지 결정
        // inline : 파일을 웹 브라우저에서 바로 열도록 설정
        // attachment : 파일을 브라우저에서 다운로드하도록 설정
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    // 파일 업로드
    @PostMapping("/")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {
        // 저장소에 파일 저장
        storageService.store(file);

        // 리다이렉트 시 메시지를 함께 첨부
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename());

        return "redirect:/";
    }

    // 저장소에 파일이 없는 경우의 예외처리
    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
}
