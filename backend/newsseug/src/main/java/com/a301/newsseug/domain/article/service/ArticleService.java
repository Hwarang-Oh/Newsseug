package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.response.HomeArticlesResponse;
import com.a301.newsseug.domain.article.model.dto.response.ListArticleResponse;

public interface ArticleService {

    HomeArticlesResponse getHomeArticles();

    ListArticleResponse getArticlesByCategory(String categoryName);

}
