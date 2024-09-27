package com.a301.newsseug.global.model.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(description = "슬라이스 상세 정보")
public class SliceDetails {

    @Schema(description = "현재 페이지")
    private int currentPage;

    @Schema(description = "첫 페이지 존재 여부")
    private boolean hasFirst;

    @Schema(description = "다음 페이지 존재 여부")
    private boolean hasNext;

    @Builder
    public SliceDetails(int currentPage, boolean hasFirst, boolean hasNext) {
        this.currentPage = currentPage;
        this.hasFirst = hasFirst;
        this.hasNext = hasNext;
    }

    public static SliceDetails of(int currentPage, boolean hasFirst, boolean hasNext) {
        return SliceDetails.builder()
                .currentPage(currentPage)
                .hasFirst(hasFirst)
                .hasNext(hasNext)
                .build();

    }

}
