package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.BirthYearViewCount;
import com.a301.newsseug.domain.article.repository.BirthYearViewCountRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import jakarta.transaction.Transactional;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class BirthYearCountServiceImpl implements BirthYearCountService{

    private final BirthYearViewCountRepository birthYearViewCountRepository;

    public void incrementBirthYearCount(Member member, Article article) {
        int birthYear = member.getBirth().getYear();

        BirthYearViewCount birthYearViewCount = birthYearViewCountRepository.findByArticleAndBirthYear(
                article, birthYear);

        if (Objects.isNull(birthYearViewCount)) {
            birthYearViewCount = BirthYearViewCount.builder().article(article).birthYear(birthYear).build();
            birthYearViewCountRepository.save(birthYearViewCount);
        }

        birthYearViewCount.view();
    }

}
