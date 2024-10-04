package com.a301.newsseug.global.model.dto;

import com.a301.newsseug.global.model.entity.PaginationDetails;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PaginatedResponse<T> {

    @Schema(description = "페이지네이션 정보")
    private PaginationDetails paginationDetails;

    @Schema(description = "결과")
    private T contents;

    private PaginatedResponse(PaginationDetails paginationDetails, T contents) {
        this.paginationDetails = paginationDetails;
        this.contents = contents;
    }

    public static <T> PaginatedResponse<T> of(PaginationDetails paginationDetails, T contents) {
        return new PaginatedResponse<>(paginationDetails, contents);
    }

}
