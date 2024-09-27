package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.response.*;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

import java.util.List;

public interface ArticleService {

    TodayArticlesResponse getHomeArticles();

    AllArticlesResponse getAllArticles();

    ListArticleResponse getArticlesByCategory(String categoryName);

    GetArticleListResponse getArticleList(CustomUserDetails userDetails, int page);

}
