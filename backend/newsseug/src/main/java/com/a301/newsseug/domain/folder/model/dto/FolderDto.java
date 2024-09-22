package com.a301.newsseug.domain.folder.model.dto;

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

    public static FolderDto of(Long id, String name, Long articleCount) {
        return FolderDto.builder()
                .id(id)
                .name(name)
                .articleCount(articleCount)
                .build();
    }

}
