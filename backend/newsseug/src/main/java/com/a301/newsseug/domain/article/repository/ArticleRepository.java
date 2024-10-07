package com.a301.newsseug.domain.article.repository;

import com.a301.newsseug.domain.article.exception.NotExistArticleException;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.ConversionStatus;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleCustomRepository {

    default Article getOrThrow(Long id) {
        return findByArticleIdAndConversionStatus(id, ConversionStatus.SUCCESS)
                .orElseThrow(NotExistArticleException::new);
    }

    Optional<Article> findByArticleIdAndConversionStatus(Long id, ConversionStatus conversionStatus);

    @EntityGraph(attributePaths = {"press"})
    Slice<Article> findAllByTitleIsContainingIgnoreCase(String keyword, Pageable pageable);

}
