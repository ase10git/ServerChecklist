package com.ase.serverckecklist.service;

import com.ase.serverckecklist.repository.CheckListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CheckListService {

    private final CheckListRepository checkListRepository;
}
