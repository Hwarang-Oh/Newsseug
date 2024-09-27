package com.a301.newsseug.domain.folder.model.dto.response;

import com.a301.newsseug.domain.folder.model.entity.Folder;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "폴더 생성 응답", description = "생성된 폴더에 대한 정보.")
public record CreateFolderResponse(

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "제목")
        String title,

        @Schema(description = "썸네일")
        String thumbnailUrl,

        @Schema(description = "저장된 기사수")
        Long articleCount

) {

    public static CreateFolderResponse of(Folder folder) {

        return CreateFolderResponse.builder()
                .id(folder.getFolderId())
                .title(folder.getTitle())
                .thumbnailUrl(folder.getThumbnailUrl())
                .articleCount(folder.getArticleCount())
                .build();

    }

}
