package com.ase.serverckecklist.service;

import com.ase.serverckecklist.repository.MarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MarkService {

    private final MarkRepository markRepository;
}
