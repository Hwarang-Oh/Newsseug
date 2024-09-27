package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.response.*;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

import com.a301.newsseug.global.model.dto.PaginatedResponse;
import java.util.List;

public interface ArticleService {

    List<GetArticleResponse> getHomeArticles();

    List<GetArticleResponse> getAllArticles();

    List<GetArticleResponse> getArticlesByCategory(String categoryName);

    PaginatedResponse<List<GetArticleDetailsResponse>> getArticleList(CustomUserDetails userDetails, int page);

}
