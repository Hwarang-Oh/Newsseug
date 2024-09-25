package com.a301.newsseug.domain.folder.model.dto.response;

import com.a301.newsseug.domain.folder.model.dto.FolderDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "폴더 목록 응답", description = "내정보 페이지에서 노출할 폴더 목록 정보.")
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
