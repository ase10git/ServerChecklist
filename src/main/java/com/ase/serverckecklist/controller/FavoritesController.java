package com.ase.serverckecklist.controller;

import com.ase.serverckecklist.service.FavoritesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/maps")
@Slf4j
@RequiredArgsConstructor
public class FavoritesController {

    private final FavoritesService favoritesService;


}
