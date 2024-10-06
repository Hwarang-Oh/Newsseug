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
import com.a301.newsseug.external.redis.config.CountProperties;
import com.a301.newsseug.global.enums.SortingCriteria;
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
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
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
    private RedisCountService redisCountService;

    @Mock
    private CountProperties countProperties;

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

    }

    @Test
    @DisplayName("오늘의 기사 목록을 가져오기 [카테고리 X]")
    void getTodayArticleListWithoutCategory() {

        // Given
        LocalDateTime startOfDay = ClockUtil.getLocalDateTime().toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1);

        PageRequest pageRequest = PageRequest.of(
                0,
                10,
                Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getValue())
        );

        // Test 데이터를 생성 (카테고리 없는 기사 목록)
        Slice<Article> articlesPage = new SliceImpl<>(Collections.singletonList(article), pageRequest, false);

        String category = "ALL";
        given(articleRepository.findAllByCategoryAndCreatedAtBetween(
                category, startOfDay, endOfDay, pageRequest
        )).willReturn(articlesPage);

        // When
        SlicedResponse<List<GetArticleResponse>> response = articleService.getTodayArticleListByCategory(category, 0);

        // Then
        assertThat(response.getSliceDetails().getCurrentPage()).isEqualTo(0);
        assertThat(response.getSliceDetails().isHasNext()).isFalse();
        assertThat(response.getContent()).hasSize(1);  // 단일 기사만 있다고 가정
        assertThat(response.getContent().get(0).title()).isEqualTo(article.getTitle());
    }

    @Test
    @DisplayName("기사 상세 정보 조회 [로그인 사용자]")
    void getArticleDetailWithLoggedInUser() throws JsonProcessingException {

        // Given
        given(articleRepository.getOrThrow(any(Long.class))).willReturn(article);
        given(userDetails.getMember()).willReturn(loginMember);
        given(subscribeRepository.existsByMemberAndPress(loginMember, press)).willReturn(true);
        given(likeRepository.existsByMemberAndArticle(loginMember, article)).willReturn(true);
        given(hateRepository.existsByMemberAndArticle(loginMember, article)).willReturn(false);
//        given(likeRepository.countByArticle(article)).willReturn(0);
//        given(hateRepository.countByArticle(article)).willReturn(0);

        // When
        GetArticleDetailsResponse response = articleService.getArticleDetail(userDetails, 1L);

        // JSON 형식 출력
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(response);
        System.out.println("JSON Response: " + jsonResponse);

        // Then
        assertThat(response.isSubscribed()).isTrue(); // 구독 여부 확인

        // 좋아요 정보 확인
        SimpleLikeDto expectedLikeInfo = SimpleLikeDto.of(Boolean.TRUE, 0L);
        assertThat(response.likeInfo()).isEqualTo(expectedLikeInfo);

        // 싫어요 정보 확인
        SimpleHateDto expectedHateInfo = SimpleHateDto.of(Boolean.FALSE, 0L);
        assertThat(response.hateInfo()).isEqualTo(expectedHateInfo);

        // optional 필드 확인
        assertThat(response.article().title()).isEqualTo("test");
        assertThat(response.press().name()).isEqualTo("name");

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
