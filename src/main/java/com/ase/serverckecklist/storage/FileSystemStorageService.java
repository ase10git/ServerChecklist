package com.ase.serverckecklist.storage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

@Service
public class FileSystemStorageService implements StorageService{

    private final Path rootLocation;

    @Autowired
    public FileSystemStorageService(StorageProperties properties) {
        // 파일 저장소 위치 값이 없을 경우 예외 처리
        if (properties.getLocation().trim().length() == 0) {
            throw new StorageException("File upload location can not be Empty");
        }

        // 파일 root 경로를 StorageProperties에 저장된 location의 경로로 설정
        this.rootLocation = Paths.get(properties.getLocation());
    }

    // 최초 실행 시 파일의 디렉터리 설정
    @Override
    public void init() {
        try {
            // root 경로에 부모 디렉터리를 포함한 디렉터리들을 생성
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            // 저장소 생성 불가 시 예외처리
            throw new StorageException("Could not initialize storage", e);
        }

    }

    // 파일을 저장
    @Override
    public void store(MultipartFile file) {
        try {
            // 파일이 비어있는 경우 예외처리
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }

            // 파일 이름을 UTF-8 인코딩으로 처리
            String originalFilename = file.getOriginalFilename();
            String encodedFilename = new String(originalFilename.getBytes("UTF-8"), "ISO-8859-1");

            // 인자로 받은 파일의 원본 이름으로 경로를 통해 경로 이름을 얻고,
            // 주어진 경로 string을 절대 경로 주소로 변환
            // 즉 새 파일이 오면 해당 파일의 저장소 위치를 저장한 객체를 생성함
            Path destinationFile = this.rootLocation
                    .resolve(Paths.get(encodedFilename)) // 인코딩된 이름으로 설정
                    .normalize().toAbsolutePath();

            // -- 보안 검사용
            // 만약 대상 파일의 상위 경로가 저장소의 절대 경로와 다른 경우
            // 실제 저장하려는 위치와 다른 경로에 파일이 저장되지 않도록 설정
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                throw new StorageException("Cannot store file outside current directory.");
            }
            
            // 파일을 받아 미리 생성한 경로에 저장
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) { // 입력 에러 처리
            throw new StorageException("Failed to store file.", e);
        }
    }

    // 저장소에 저장된 파일 및 서브 디렉터리들의 상대 경로를 반환
    // /storage 내의 /storage/test1.txt 같은 파일의 경로를 `test1.txt`로 반환
    @Override
    public Stream<Path> loadAll() {
        try {
            // 시작 지점으로부터 최대 깊이가 1인 file tree를 탐색한 결과를 반환하고,
            // 그 중에서 루트 디렉터리 자체를 제외한 디렉터리 내 파일과 서브 디렉터리만 남긴 후,
            // 루트 디렉터리를 기준으로 한 파일 및 서브 디렉터리의 상대 경로를 반환함
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        } catch (IOException e) {
            throw new StorageException("Failed to read sotred files.", e);
        }
    }

    // 인자로 받은 파일의 경로를 반환
    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    // 파일 이름으로 리소스 가져오기
    @Override
    public Resource loadAsResource(String filename) {
        try {
            // 파일 이름으로 파일 경로 가져오기
            Path file = load(filename);

            // 파일의 절대 경로 객체를 가진 URL 리소스 객체를 생성
            Resource resource = new UrlResource(file.toUri());

            // 리소스가 존재하거나 읽을 수 있는 겨우 리소스를 반환
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else { // 파일을 읽을 수 없는 경우 에러 처리
                throw new StorageFileNotFoundException("Could not read file: "+filename);
            }
        } catch (MalformedURLException e) {
            // 읽을 수 없는 파일의 에러 처리
            throw new StorageFileNotFoundException("Could not read file: "+filename, e);
        }
    }

    // 저장소에 등록된 파일들을 제거
    @Override
    public void deleteAll() {
        // FileSystemUtils : 파일 시스템과 같이 동작하는 유틸 메소드를 가진 추상 클래스
        // deleteRecursively : 인자로 받은 파일을 제거함
        // File toFile() : 해당 경로에 위치한 파일을 watch 서비스를 통해 등록함
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }
}
