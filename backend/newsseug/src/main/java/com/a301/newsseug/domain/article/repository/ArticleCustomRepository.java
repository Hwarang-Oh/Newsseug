package com.a301.newsseug.domain.article.repository;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.press.model.entity.Press;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface ArticleCustomRepository {

    Slice<Article> findAllByPressAndCategory(Press press, String category, Pageable pageable);

}
