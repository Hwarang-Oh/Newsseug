package com.a301.newsseug.domain.article.repository;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.press.model.entity.Press;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.time.LocalDateTime;
import java.util.List;

public interface ArticleCustomRepository {

    Slice<Article> findAllByCategoryAndCreatedAtBetween(String category, LocalDateTime startOfDay, LocalDateTime endOfDay, Pageable pageable);

    Slice<Article> findAllByCategory(String category, Pageable pageable);

    Slice<Article> findAllByPressAndCategory(Press press, String category, Pageable pageable);

    Slice<Article> findByPress(List<Press> pressList, String category, Pageable pageable);

    void updateCount(String fieldName, Long articleId, Long newValue);

}
