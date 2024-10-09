package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.response.*;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import java.util.List;

public interface ArticleService {

    GetArticleDetailsResponse getArticleDetail(CustomUserDetails userDetails, Long articleId);

    GetArticleDetailsResponse getRandomArticle(CustomUserDetails userDetails);

    SlicedResponse<List<GetArticleResponse>> getTodayArticleListByCategory(String category, int pageNumber);

    SlicedResponse<List<GetArticleResponse>> getArticleListByCategory(String category, int pageNumber);

    SlicedResponse<List<GetArticleResponse>> getArticlesByPress(CustomUserDetails userDetails, Long pressId, int pageNumber, String category);

    SlicedResponse<List<GetArticleResponse>> getArticlesByBirthYear(CustomUserDetails userDetails, int pageNumber);

}