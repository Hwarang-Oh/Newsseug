package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.SimpleArticleDto;
import com.a301.newsseug.domain.article.model.dto.response.HomeArticlesResponse;
import com.a301.newsseug.domain.article.model.dto.response.ListArticleResponse;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.Category;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;

    private final PressRepository pressRepository;

    @Override
    public HomeArticlesResponse getHomeArticles() {

        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();  // 오늘 00:00:00
        LocalDateTime endOfDay = startOfDay.plusDays(1);  // 내일 00:00:00 까지
        List<Article> todaysArticles = articleRepository.findByCreatedAtBetween(startOfDay, endOfDay);

        // 전체 기사
        List<Article> allArticles = articleRepository.findAllByOrderByCreatedAtDesc();

        // ListHomeArticleResponse 생성
        return HomeArticlesResponse.of(
                mapToListArticleResponse(todaysArticles),
                mapToListArticleResponse(allArticles), // 이곳에 20대 추천 기사가 들어가야함
                mapToListArticleResponse(allArticles)
        );
    }

    @Override
    public ListArticleResponse getArticlesByCategory(String categoryName) {

        Category category = Category.valueOf(categoryName.toUpperCase());

        List<Article> articles = articleRepository.findByCategoryOrderByCreatedAtDesc(category);

        return mapToListArticleResponse(articles);

    }

    /**
     * Article 리스트를 ListArticleResponse 리스트로 변환하는 메서드
     */
    private ListArticleResponse mapToListArticleResponse(List<Article> articles) {

        return ListArticleResponse.of(
                articles.stream()
                    .map(SimpleArticleDto::of)
                    .collect(Collectors.toList())
        );

    }

    /**
     * Press ID를 통해 해당 언론사의 이름을 가져오는 메서드
     */
    private String getPressName(Long pressId) {

        Press press = pressRepository.findByPressId(pressId);

        return press.getPressBranding().getName();

    }
}
