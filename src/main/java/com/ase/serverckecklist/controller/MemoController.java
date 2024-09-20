package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.entity.Memo;
import com.ase.serverckecklist.service.MemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class MemoController {

    @Autowired
    private MemoService memoService;

    @GetMapping("/api/servernotes")
    public ArrayList<Memo> index() {
        return memoService.index(); // Service에서 DB 동작 수행
    }
}
