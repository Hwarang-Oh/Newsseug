package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.SimpleArticleDto;
import com.a301.newsseug.domain.article.model.dto.response.AllArticlesResponse;
import com.a301.newsseug.domain.article.model.dto.response.GetArticleResponse;
import com.a301.newsseug.domain.article.model.dto.response.TodayArticlesResponse;
import com.a301.newsseug.domain.article.model.dto.response.ListArticleResponse;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.Category;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.SimpleHateDto;
import com.a301.newsseug.domain.interaction.model.dto.SimpleLikeDto;
import com.a301.newsseug.domain.interaction.repository.HateRepository;
import com.a301.newsseug.domain.interaction.repository.LikeRepository;
import com.a301.newsseug.domain.interaction.repository.ReportRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
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

    private final LikeRepository likeRepository;

    private final HateRepository hateRepository;

    private final SubscribeRepository subscribeRepository;

    @Override
    public TodayArticlesResponse getHomeArticles() {

        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();  // 오늘 00:00:00
        LocalDateTime endOfDay = startOfDay.plusDays(1);  // 내일 00:00:00 까지
        List<Article> todaysArticles = articleRepository.findByCreatedAtBetween(startOfDay, endOfDay);

        // TodayArticleResponse 생성
        return TodayArticlesResponse.of(
                mapToListArticleResponse(todaysArticles)
        );

    }

    @Override
    public AllArticlesResponse getAllArticles() {

        // 전체 기사
        List<Article> allArticles = articleRepository.findAllByOrderByCreatedAtDesc();

        return AllArticlesResponse.of(
                mapToListArticleResponse(allArticles)
        );

    }

    @Override
    public ListArticleResponse getArticlesByCategory(String categoryName) {

        Category category = Category.valueOf(categoryName.toUpperCase());

        List<Article> articles = articleRepository.findByCategoryOrderByCreatedAtDesc(category);

        return mapToListArticleResponse(articles);

    }

    @Override
    public GetArticleResponse getArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();

        Article article = articleRepository.getOrThrow(articleId);

        Press press = article.getPress();

        Boolean subscribeStatus = subscribeRepository.existsByMemberAndPress(loginMember, press);

        Boolean likeStatus = likeRepository.existsByMemberAndArticle(loginMember, article);
        int likeCount = likeRepository.countByArticle(article);

        Boolean hateStatus = hateRepository.existsByMemberAndArticle(loginMember, article);
        int hateCount = hateRepository.countByArticle(article);

        return GetArticleResponse.of(
                SimpleArticleDto.of(article),
                SimplePressDto.of(press),
                subscribeStatus,
                SimpleLikeDto.of(likeStatus, likeCount),
                SimpleHateDto.of(hateStatus, hateCount)
        );

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
