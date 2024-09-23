package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.response.TodayArticlesResponse;
import com.a301.newsseug.domain.article.model.dto.response.ListArticleResponse;

public interface ArticleService {

    TodayArticlesResponse getHomeArticles();

    ListArticleResponse getAllArticles();

    ListArticleResponse getArticlesByCategory(String categoryName);

}
