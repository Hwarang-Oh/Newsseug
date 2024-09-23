package com.a301.newsseug.domain.article.model.entity.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "기사")
public record SimpleArticleDto(

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "언론사 이름")
        String press,

        @Schema(description = "제목")
        String title,

        @Schema(description = "조회수")
        Long viewCount,

        @Schema(description = "영상 URL")
        String videoUrl

) {

    public static SimpleArticleDto of(Long id, String press, String title, Long viewCount, String videoUrl) {
        return SimpleArticleDto.builder()
                .id(id)
                .press(press)
                .title(title)
                .viewCount(viewCount)
                .videoUrl(videoUrl)
                .build();
    }

}
