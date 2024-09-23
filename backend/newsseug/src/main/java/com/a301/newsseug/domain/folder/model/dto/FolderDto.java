package com.a301.newsseug.domain.folder.model.dto;

import com.a301.newsseug.domain.folder.model.entity.Folder;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

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
                .id(folder.getId())
                .name(folder.getName())
                .articleCount(folder.getArticleCount())
                .build();
    }

}
