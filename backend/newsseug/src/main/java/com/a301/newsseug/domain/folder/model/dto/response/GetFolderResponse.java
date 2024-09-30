package com.a301.newsseug.domain.folder.model.dto.response;

import com.a301.newsseug.domain.bookmark.model.entity.Bookmark;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.Map;
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

        @Schema(description = "저장된 기사 정보")
        List<Long> articles

) {

    public static GetFolderResponse of(Folder folder, List<Bookmark> bookmarks) {
        return GetFolderResponse.builder()
                .id(folder.getFolderId())
                .title(folder.getTitle())
                .articles(
                        bookmarks.stream()
                                .map(bookmark -> bookmark.getArticle().getArticleId())
                                .toList()
                )
                .build();
    }

    public static List<GetFolderResponse> of(Map<Folder, List<Bookmark>> folders) {
        return folders.entrySet().stream()
                .map(entry -> GetFolderResponse.of(entry.getKey(), entry.getValue()))
                .toList();
    }

}
