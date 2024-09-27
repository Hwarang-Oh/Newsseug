package com.a301.newsseug.global.model.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(description = "페이지네이션 상세 정보")
public class PaginationDetail {

    @Schema(description = "전체 페이지 수")
    private int totalPages;

    @Schema(description = "전체 요소 수")
    private long totalElements;

    @Schema(description = "현재 페이지")
    private int pageNumber;


    @Builder
    public PaginationDetail(int totalPages, long totalElements, int pageNumber) {
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.pageNumber = pageNumber;
    }

    public static PaginationDetail of(int totalPages, long totalElements, int pageNumber) {
        return PaginationDetail.builder()
                .totalPages(totalPages)
                .totalElements(totalElements)
                .pageNumber(pageNumber)
                .build();

    }

}
