package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.member.model.entity.Member;

public interface BirthYearCountService {

    void incrementBirthYearCount(Member member, Article article);

}
