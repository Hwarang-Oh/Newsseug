package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.response.*;
import com.a301.newsseug.domain.article.model.entity.type.CategoryType;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

import com.a301.newsseug.global.model.dto.SlicedResponse;

import java.util.List;

public interface ArticleService {

    SlicedResponse<List<GetArticleResponse>> getTodayArticleListByCategory(String category, int pageNumber);

    SlicedResponse<List<GetArticleResponse>> getArticleListByCategory(String category, int pageNumber);

    GetArticleDetailsResponse getArticleDetail(CustomUserDetails userDetails, Long articleId);

    SlicedResponse<List<GetArticleResponse>> getArticlesByPress(Long pressId, int pageNumber, String category, String criteria);

//    List<GetArticleResponse> getAllArticles();

//    SlicedResponse<List<GetArticleDetailsResponse>> getArticleDetailList(CustomUserDetails userDetails, int page);

}