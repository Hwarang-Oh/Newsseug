package com.a301.newsseug.domain.article.repository;

import com.a301.newsseug.domain.article.exception.NotExistArticleException;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.CategoryType;
import com.a301.newsseug.domain.press.model.entity.Press;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleCustomRepository {

    default Article getOrThrow(Long id) {
        return findById(id).orElseThrow(NotExistArticleException::new);
    }

    // 오늘의 뉴스
    Slice<Article> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);

    Slice<Article> findByCreatedAtBetweenAndCategory(LocalDateTime startOfDay, LocalDateTime endOfDay, CategoryType category, Pageable pageable);

    // 전체 기사 (최신순 모든 기사)
    Slice<Article> findAllByOrderByCreatedAtDesc(Pageable pageable);

    // 카테고리별 기사 조회
    Slice<Article> findByCategoryOrderByCreatedAtDesc(CategoryType categoryType, Pageable pageable);

}
