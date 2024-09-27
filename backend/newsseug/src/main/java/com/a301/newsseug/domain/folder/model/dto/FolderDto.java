package com.a301.newsseug.domain.folder.model.dto;

import com.a301.newsseug.domain.folder.model.entity.Folder;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "폴더 정보")
public record FolderDto(

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "이름")
        String name,

        @Schema(description = "스크랩 기사수")
        Long articleCount

) {

    public static FolderDto of(Folder folder) {
        return FolderDto.builder()
                .id(folder.getFolderId())
                .name(folder.getTitle())
                .articleCount(folder.getArticleCount())
                .build();
    }

}
