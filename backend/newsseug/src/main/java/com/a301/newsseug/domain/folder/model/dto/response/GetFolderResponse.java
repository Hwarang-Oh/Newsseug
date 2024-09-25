package com.a301.newsseug.domain.folder.model.dto.response;

import com.a301.newsseug.domain.article.model.dto.SimpleArticleDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "폴더 상세 조회 응답", description = "폴더 목록에서 하나의 폴더를 클릭했을 때 노출할 정보.")
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
