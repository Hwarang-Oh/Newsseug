package com.a301.newsseug.domain.article.repository;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.BirthYearViewCount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BirthYearViewCountRepository extends JpaRepository<BirthYearViewCount, Long> {

    BirthYearViewCount findByArticleAndBirthYear(Article article, int birthYear);
}
