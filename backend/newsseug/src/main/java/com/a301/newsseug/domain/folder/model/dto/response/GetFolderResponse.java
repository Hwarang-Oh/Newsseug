package com.a301.newsseug.domain.folder.model.dto.response;

import com.a301.newsseug.domain.article.model.dto.SimpleArticleDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "폴더 상세 조회")
public record GetFolderResponse(

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "이름")
        String name,

        @Schema(description = "스크랩한 기사 목록")
        List<SimpleArticleDto> articles

) {

    public static GetFolderResponse of(Long id, String name, List<SimpleArticleDto> articles) {
        return GetFolderResponse.builder()
                .id(id)
                .name(name)
                .articles(articles)
                .build();
    }

}
