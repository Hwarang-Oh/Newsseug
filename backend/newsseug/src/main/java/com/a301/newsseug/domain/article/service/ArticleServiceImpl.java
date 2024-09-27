package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.response.GetArticleResponse;
import com.a301.newsseug.domain.article.model.dto.response.*;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.CategoryType;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.SimpleHateDto;
import com.a301.newsseug.domain.interaction.model.dto.SimpleLikeDto;
import com.a301.newsseug.domain.interaction.repository.HateRepository;
import com.a301.newsseug.domain.interaction.repository.LikeRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;
import com.a301.newsseug.global.model.dto.PaginatedResponse;
import com.a301.newsseug.global.model.entity.PaginationDetails;
import com.a301.newsseug.global.util.ClockUtil;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public List<GetArticleResponse> getHomeArticles() {
        LocalDateTime startOfDay = ClockUtil.getLocalDateTime().toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1);
        List<Article> todayArticles = articleRepository.findByCreatedAtBetween(startOfDay, endOfDay);
        return GetArticleResponse.of(todayArticles);
    }

    @Override
    public List<GetArticleResponse> getAllArticles() {
        List<Article> articles = articleRepository.findAllByOrderByCreatedAtDesc();
        return GetArticleResponse.of(articles);
    }

    @Override
    public List<GetArticleResponse> getArticlesByCategory(String categoryName) {
        CategoryType categoryType = CategoryType.valueOf(categoryName.toUpperCase());
        List<Article> articles = articleRepository.findByCategoryOrderByCreatedAtDesc(categoryType);
        return GetArticleResponse.of(articles);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<List<GetArticleDetailsResponse>> getArticleList(CustomUserDetails userDetails, int page) {

        Member loginMember = userDetails.getMember();

        PageRequest pageRequest = PageRequest.of(page, 10);
        Page<Article> articlesPage = articleRepository.findAll(pageRequest);

        List<GetArticleDetailsResponse> articles = articlesPage.getContent().stream()
                .map(article -> {
                    Press press = article.getPress();
                    Boolean isSubscribe = subscribeRepository.existsByMemberAndPress(loginMember, press);
                    Boolean isLike = likeRepository.existsByMemberAndArticle(loginMember, article);
                    Integer likeCount = likeRepository.countByArticle(article);
                    Boolean isHate = hateRepository.existsByMemberAndArticle(loginMember, article);
                    Integer hateCount = hateRepository.countByArticle(article);

                    return GetArticleDetailsResponse.of(
                            article,
                            isSubscribe,
                            SimpleLikeDto.of(isLike, likeCount),
                            SimpleHateDto.of(isHate, hateCount)
                    );
                })
                .toList();

        PaginationDetails paginationDetails = PaginationDetails.of(
                articlesPage.getTotalPages(),
                articlesPage.getTotalElements(),
                articlesPage.getNumber()
        );

        return PaginatedResponse.of(paginationDetails, articles);

    }

}
