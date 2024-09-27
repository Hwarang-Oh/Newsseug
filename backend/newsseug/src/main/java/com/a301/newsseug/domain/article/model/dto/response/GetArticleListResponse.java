package com.a301.newsseug.domain.article.model.dto.response;

import com.a301.newsseug.global.model.entity.PaginationDetail;
import lombok.Builder;

import java.util.List;

@Builder
public record GetArticleListResponse(

        List<GetArticleResponse> article,

        PaginationDetail paginationDetail

) {

    public static GetArticleListResponse of(List<GetArticleResponse> article, PaginationDetail paginationDetail) {

        return GetArticleListResponse.of(article, paginationDetail);
    }
}
