package com.a301.newsseug.domain.article.repository;

import com.a301.newsseug.domain.article.exception.NotExistArticleException;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.Category;
import com.a301.newsseug.domain.member.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    default Article getOrThrow(Long id) {
        return findById(id).orElseThrow(NotExistArticleException::new);
    }

    // 오늘의 뉴스
    List<Article> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    // 전체 기사 (최신순 모든 기사)
    List<Article> findAllByOrderByCreatedAtDesc();

    // 카테고리별 기사 조회
    List<Article> findByCategoryOrderByCreatedAtDesc(Category category);

}
