package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.factory.ArticleFactory;
import com.a301.newsseug.domain.article.model.dto.response.GetArticleDetailsResponse;
import com.a301.newsseug.domain.article.model.dto.response.GetArticleResponse;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.SimpleHateDto;
import com.a301.newsseug.domain.interaction.model.dto.SimpleLikeDto;
import com.a301.newsseug.domain.interaction.repository.HateRepository;
import com.a301.newsseug.domain.interaction.repository.LikeRepository;
import com.a301.newsseug.domain.member.factory.entity.MemberFactory;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.util.ClockUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@DisplayName("기사 관련 기능")
@ExtendWith(MockitoExtension.class)
public class ArticleServiceTest {

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private SubscribeRepository subscribeRepository;

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private HateRepository hateRepository;

    @Mock
    private CustomUserDetails userDetails;

    @InjectMocks
    private ArticleServiceImpl articleService;

    private Member loginMember;
    private Article article;
    private Press press;

    @BeforeEach
    void beforeEach() {

        loginMember = MemberFactory.memberOfKakao(1L);
        article = ArticleFactory.article(1L);
        press = article.getPress();

        given(articleRepository.getOrThrow(any(Long.class))).willReturn(article);

    }

    @Test
    @DisplayName("오늘의 기사 목록을 가져오기 [카테고리 X]")
    void getTodayArticleListWithoutCategory() {

        // Given
        LocalDateTime startOfDay = ClockUtil.getLocalDateTime().toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1);

        PageRequest pageRequest = PageRequest.of(0, 10);
        Slice<Article> articlesPage = new SliceImpl<>(Collections.singletonList(article), pageRequest, false);

        String category;

//        given(articleRepository.findAllByCategoryAndCreatedAtBetween(category, endOfDay, pageRequest)).willReturn(articlesPage);

        // When
        SlicedResponse<List<GetArticleResponse>> response = articleService.getTodayArticleListByCategory(null, 0);

        // Then
        assertThat(response.getSliceDetails().getCurrentPage()).isEqualTo(0);
        assertThat(response.getSliceDetails().isHasNext()).isFalse();
        assertThat(response.getContent()).hasSize(1);
        assertThat(response.getContent().get(0).title()).isEqualTo(article.getTitle());

    }

    @Test
    @DisplayName("기사 상세 정보 조회 [로그인 사용자]")
    void getArticleDetailWithLoggedInUser() throws JsonProcessingException {

        // Given
        given(userDetails.getMember()).willReturn(loginMember);
        given(subscribeRepository.existsByMemberAndPress(loginMember, press)).willReturn(true);
        given(likeRepository.existsByMemberAndArticle(loginMember, article)).willReturn(true);
        given(hateRepository.existsByMemberAndArticle(loginMember, article)).willReturn(false);
        given(likeRepository.countByArticle(article)).willReturn(5);
        given(hateRepository.countByArticle(article)).willReturn(1);

        // When
        GetArticleDetailsResponse response = articleService.getArticleDetail(userDetails, 1L);

        // JSON 형식 출력
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(response);
        System.out.println("JSON Response: " + jsonResponse);

        // Then
        assertThat(response.isSubscribed()).isTrue();
        assertThat(response.likeInfo()).isEqualTo(SimpleLikeDto.of(Boolean.TRUE, 5L));
        assertThat(response.hateInfo()).isEqualTo(SimpleHateDto.of(Boolean.FALSE, 1L));

    }

    @Test
    @DisplayName("기사 상세 정보 조회 [비로그인 사용자]")
    void getArticleDetailWithoutLogin() {

        // Given
        CustomUserDetails nullUserDetails = null;
        given(likeRepository.countByArticle(article)).willReturn(5);
        given(hateRepository.countByArticle(article)).willReturn(1);

        // When
        GetArticleDetailsResponse response = articleService.getArticleDetail(nullUserDetails, 1L);

        // Then
        assertThat(response.isSubscribed()).isFalse();
        assertThat(response.likeInfo()).isEqualTo(SimpleLikeDto.of(Boolean.FALSE, 5L));
        assertThat(response.hateInfo()).isEqualTo(SimpleHateDto.of(Boolean.FALSE, 1L));

    }

}
