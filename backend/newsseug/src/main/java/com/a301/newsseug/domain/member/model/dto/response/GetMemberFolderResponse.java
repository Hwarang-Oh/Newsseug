package com.a301.newsseug.domain.member.model.dto.response;

import com.a301.newsseug.domain.folder.model.entity.Folder;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "폴더 정보", description = "목록 조회시 노출할 폴더 정보")
public record GetMemberFolderResponse(

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "이름")
        String title,

        @Schema(description = "썸네일")
        String thumbnailUrl,

        @Schema(description = "기사 개수")
        Long articleCount

) {

    public static GetMemberFolderResponse of(Folder folder) {
        return GetMemberFolderResponse.builder()
                .id(folder.getFolderId())
                .title(folder.getTitle())
                .thumbnailUrl(folder.getThumbnailUrl())
                .articleCount(folder.getArticleCount())
                .build();
    }

    public static List<GetMemberFolderResponse> of(List<Folder> folders) {
        return folders.stream()
                .map(GetMemberFolderResponse::of)
                .toList();
    }

}
