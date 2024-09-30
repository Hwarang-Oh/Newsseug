package com.a301.newsseug.domain.bookmark.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

@Schema(name = "기사 저장", description = "기사 저장에 필요한 정보")
public record CreateBookmarkRequest(

        @NotBlank
        @Schema(description = "저장할 기사")
        Long articleId,

        @Size(min = 1)
        @Schema(description = "저장할 폴더 목록")
        List<Long> folderIds

) {

}
