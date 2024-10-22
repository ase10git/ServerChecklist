package com.ase.serverckecklist.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/api/hello")
    public String hello() {
        return "Springboot<->React";
    }

}
