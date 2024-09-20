package com.ase.serverckecklist.service;

import com.ase.serverckecklist.repository.MapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MapService {

    private final MapRepository mapRepository;
}
