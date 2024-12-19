package com.ase.serverckecklist.file.service;

import com.ase.serverckecklist.file.dto.LoadFile;
import com.ase.serverckecklist.server.entity.Map;
import com.ase.serverckecklist.server.entity.ServerInfo;
import com.ase.serverckecklist.server.repository.MapRepository;
import com.ase.serverckecklist.server.repository.ServerInfoRepository;
import com.ase.serverckecklist.user.entity.User;
import com.ase.serverckecklist.user.repository.UserRepository;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FileService {

    private final GridFsTemplate template;
    private final GridFsOperations operations;
    private final UserRepository userRepository;
    private final ServerInfoRepository serverInfoRepository;
    private final MapRepository mapRepository;

    // 파일 저장하기
    public String addFile(MultipartFile file) throws IOException {
        // 메타 데이터 생성
        DBObject metadata = new BasicDBObject();
        metadata.put("fileSize", file.getSize());

        // GridFS에 파일 저장하기
        // InputStream, filename, metadata 정보로 파일을 저장함
        Object fileID = template.store(
                file.getInputStream(), file.getOriginalFilename(),
                file.getContentType(), metadata);

        // 파일 id를 반환
        return fileID.toString();
    }

    // 특정 파일 가져오기
    public LoadFile downloadFile(String id) throws IOException {
        // GridFS에 저장된 파일 중 _id가 찾으려는 id와 일치하는 파일을 query
        // GridFsCriteria 클래스로 Query를 정의할 수 있음
        GridFSFile gridFSFile = template.findOne( new Query(Criteria.where("_id").is(id)) );

        // 받아올 파일 정보를 저장한 객체
        LoadFile loadFile = new LoadFile();

        // GridFS에 검색한 파일과 메타 데이터가 존재할 때
        if (gridFSFile != null && gridFSFile.getMetadata() != null) {
            // 받아올 파일 객체에 GridFS의 정보들을 저장
            loadFile.setId(id);
            loadFile.setFilename(gridFSFile.getFilename());
            loadFile.setFileType(gridFSFile.getMetadata().get("_contentType").toString());
            loadFile.setFileSize(gridFSFile.getMetadata().get("fileSize").toString());
            loadFile.setFile(IOUtils.toByteArray(operations.getResource(gridFSFile).getInputStream()));
        }

        return loadFile;
    }

    // 파일 제거하기
    public void deleteFile(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        GridFSFile gridFSFile = template.findOne(query);

        if (gridFSFile != null) {
            template.delete(query);
        }
    }

    // 사용자 이메일로 프로필 사진 가져오기
    public LoadFile findUserProfile(String email) throws IOException {
        // 사용자 조회
        User user = userRepository.findByEmail(email).orElse(null);

        // null 처리
        if (user == null)  return null;

        // 사용자 프로필 사진 id를 가져와서 파일 받기
        String fileId = user.getProfile();
        return downloadFile(fileId);
    }

    // 서버 id로 서버 사진 가져오기
    public LoadFile findServerImage(String id) throws IOException {
        // 서버 조회
        ServerInfo serverInfo = serverInfoRepository.findById(id).orElse(null);

        // null 처리
        if (serverInfo == null)  return null;

        // 서버 사진 id를 가져와서 파일 받기
        String fileId = serverInfo.getPhotoId();
        return downloadFile(fileId);
    }

    // 지도 id로 서버 사진 가져오기
    public LoadFile findMapImage(String id) throws IOException {
        // 지도 조회
        Map map = mapRepository.findById(id).orElse(null);

        // null 처리
        if (map == null)  return null;

        // 지도 사진 id를 가져와서 파일 받기
        String fileId = map.getPhotoId();
        return downloadFile(fileId);
    }
}
