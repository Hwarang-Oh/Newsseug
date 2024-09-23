package com.a301.newsseug.domain.folder.model.dto.response;

import com.a301.newsseug.domain.folder.model.dto.FolderDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "폴더 목록", description = "사용자가 폴더 목록을 조회한 결과")
public record ListFolderResponse(

        @Schema(description = "폴더")
        List<FolderDto> folders

) {

    public static ListFolderResponse of(List<FolderDto> folders) {
        return ListFolderResponse.builder()
                .folders(folders)
                .build();
    }

}
