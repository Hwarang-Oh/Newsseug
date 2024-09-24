package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.response.AllArticlesResponse;
import com.a301.newsseug.domain.article.model.dto.response.GetArticleResponse;
import com.a301.newsseug.domain.article.model.dto.response.TodayArticlesResponse;
import com.a301.newsseug.domain.article.model.dto.response.ListArticleResponse;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

public interface ArticleService {

    TodayArticlesResponse getHomeArticles();

    AllArticlesResponse getAllArticles();

    ListArticleResponse getArticlesByCategory(String categoryName);

    GetArticleResponse getArticle(CustomUserDetails userDetails, Long articleId);

}
