package com.a301.newsseug.domain.folder.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "폴더 API")
@RestController
@RequestMapping("/api/v1/folders")
@RequiredArgsConstructor
public class FolderController {

}
