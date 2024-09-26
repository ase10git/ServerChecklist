package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.service.FavoritesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/maps")
@Slf4j
@RequiredArgsConstructor
public class FavoritesController {

    private final FavoritesService favoritesService;


}
