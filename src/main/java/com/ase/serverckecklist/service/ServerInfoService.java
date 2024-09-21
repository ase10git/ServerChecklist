package com.ase.serverckecklist.service;

import com.ase.serverckecklist.repository.ServerInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServerInfoService {

    private final ServerInfoRepository serverInfoRepository;
}
