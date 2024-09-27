package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.factory.ArticleFactory;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.factory.entity.MemberFactory;
import com.a301.newsseug.domain.member.model.entity.Member;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

@DisplayName("기사 관련 기능")
public class ArticleServiceTest {

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private CustomUserDetails userDetails;

    @InjectMocks
    private ArticleServiceImpl articleService;

    private Member loginMember;

    @BeforeEach
    void beforeEach() {

        loginMember = MemberFactory.memberOfKakao(1L);
        MockitoAnnotations.openMocks(this);
        given(userDetails.getMember()).willReturn(loginMember);

    }

    @Test
    @DisplayName("전체 기사 목록 조회")
    void getAllArticles() {
        Article article1 = ArticleFactory.article(1L);
        Article article2 = ArticleFactory.article(2L);
        List<Article> mockArticles = Arrays.asList(article1, article2);

        // Mock repository behavior for finding all articles ordered by creation date
//        given(articleRepository.findAllByOrderByCreatedAtDesc()).willReturn(mockArticles);

        // Act: Call the service method to get all articles
//        List<Article> result = articleService.getAllArticles();

        // Assert: Check the result
//        assertEquals(2, result.size());
//        assertEquals("test", result.get(0).getTitle());
//        assertEquals("test", result.get(1).getTitle());
    }

}
