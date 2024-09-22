package com.a301.newsseug.domain.article.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "기사 정보", description = "기사 목록 조회 시 노출할 정보.")
public record SimpleArticleDto(

        @Schema(description = "기사 고유 식별자", examples = {"99"})
        Long id,

        @Schema(description = "언론사 이름", examples = {"조선일보"})
        String pressName,

        @Schema(description = "썸네일 URL", examples = {"https://{bucket-name}.s3.ap-northeast-2.amazonaws.com/{directory-name}/"})
        String thumbnailUrl,

        @Schema(description = "기사 제목", examples = {"오늘밤 최대 150㎜ 퍼붓는다 남부·동해안 '뒤끝 폭우' 고비"})
        String title,

        @Schema(description = "조회수", examples = {"150"})
        Long viewCount

) {

        public static SimpleArticleDto of(Long id, String pressName, String thumbnailUrl, String title, Long viewCount) {
                return SimpleArticleDto.builder()
                        .id(id)
                        .pressName(pressName)
                        .thumbnailUrl(thumbnailUrl)
                        .title(title)
                        .viewCount(viewCount)
                        .build();
        }

}
