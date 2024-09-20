package com.ase.serverckecklist.service;

import com.ase.serverckecklist.entity.Memo;
import com.ase.serverckecklist.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MemoService {
    private final MemoRepository memoRepository;
    public ArrayList<Memo> index() {
        return (ArrayList<Memo>) memoRepository.findAll();
    }
}
