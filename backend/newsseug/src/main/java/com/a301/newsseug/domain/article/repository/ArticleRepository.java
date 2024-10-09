package com.a301.newsseug.domain.article.repository;

import com.a301.newsseug.domain.article.exception.NotExistArticleException;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.CategoryType;
import com.a301.newsseug.domain.article.model.entity.type.ConversionStatus;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleCustomRepository {

    default Article getOrThrow(Long id) {
        return findByArticleIdAndConversionStatus(id, ConversionStatus.SUCCESS)
                .orElseThrow(NotExistArticleException::new);
    }

    List<Article> findAllByCategoryAndActivationStatusAndConversionStatus(CategoryType categoryType, ActivationStatus activationStatus, ConversionStatus conversionStatus);

    Optional<Article> findByArticleIdAndConversionStatus(Long id, ConversionStatus conversionStatus);

    @Query("SELECT a FROM Article a JOIN BirthYearViewCount b WHERE YEAR(CURRENT_DATE) - b.birthYear " +
            "BETWEEN :ageBegin AND :ageEnd " +
            "GROUP BY a ORDER BY SUM(b.viewCount) DESC")
    Slice<Article> findAllByBirthYearOrderByViewCount(@Param("ageBegin") Integer ageBegin, @Param("ageEnd") Integer ageEnd, Pageable pageable);

}
