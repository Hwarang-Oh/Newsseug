package com.a301.newsseug.domain.folder.model.dto.response;

import com.a301.newsseug.domain.folder.model.entity.Folder;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "폴더 정보", description = "목록 조회시 노출할 폴더 정보")
public record GetFolderResponse(

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "이름")
        String title,

        @Schema(description = "썸네일")
        String thumbnailUrl,

        @Schema(description = "스크랩 기사수")
        Long articleCount

) {

    public static GetFolderResponse of(Folder folder) {
        return GetFolderResponse.builder()
                .id(folder.getFolderId())
                .title(folder.getTitle())
                .articleCount(folder.getArticleCount())
                .build();
    }

    public static List<GetFolderResponse> of(List<Folder> folder) {
        return folder.stream()
                .map(GetFolderResponse::of)
                .toList();
    }

}
