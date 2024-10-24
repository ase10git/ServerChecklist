package com.ase.serverckecklist.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {
    void init();
    
    // 파일 저장
    void store(MultipartFile file);
    
    // 경로 전체 가져오기
    // Path : 경로 string을 다루는 인터페이스
    Stream<Path> loadAll();
    
    // 경로 가져오기
    Path load(String filename);
    
    // 파일 가져오기
    // Resource : 해당 자원이 물리적으로 실존하는지 결정하는 인터페이스
    Resource loadAsResource(String filename);
    
    // 전체 삭제하기
    void deleteAll();
}
