package com.a301.newsseug.domain.folder.model.response;

import com.a301.newsseug.domain.folder.model.dto.FolderDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "폴더 목록")
public record FolderListResponse(

        @Schema(description = "폴더")
        List<FolderDto> folders

) {

    public static FolderListResponse of(List<FolderDto> folders) {
        return FolderListResponse.builder()
                .folders(folders)
                .build();
    }

}
