package com.a301.newsseug.domain.article.repository;

import com.a301.newsseug.domain.article.exception.NotExistArticleException;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.ConversionStatus;
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

}
