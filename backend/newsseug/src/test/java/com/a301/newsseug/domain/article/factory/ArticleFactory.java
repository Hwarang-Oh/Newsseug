package com.a301.newsseug.domain.article.factory;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.CategoryType;
import org.springframework.test.util.ReflectionTestUtils;

public class ArticleFactory {

    public static Article article(Long id) {

        Article article = Article.builder()
                .title("test")
                .sourceUrl("test_source_url")
                .contentUrl("test_content_url")
                .videoUrl("test_video_url")
                .thumbnailUrl("test_thumbnail_url")
                .category(CategoryType.POLITICS)
                .build();

        ReflectionTestUtils.setField(article, "id", id);

        return article;
    }

}
