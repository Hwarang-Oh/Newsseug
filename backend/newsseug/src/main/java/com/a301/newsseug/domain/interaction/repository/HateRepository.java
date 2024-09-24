package com.a301.newsseug.domain.interaction.repository;

import com.a301.newsseug.domain.article.exception.NotExistArticleException;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.interaction.model.entity.Hate;
import com.a301.newsseug.domain.interaction.model.entity.Like;
import com.a301.newsseug.domain.member.model.entity.Member;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface HateRepository extends CrudRepository<Hate, Long> {

    default Hate getOrThrow(Member member, Article article) {
        return findByMemberAndArticle(member, article).orElseThrow(NotExistArticleException::new);
    }

    Optional<Hate> findByMemberAndArticle(Member member, Article article);

    int countByArticle(Article article);

    Boolean existsByMemberAndArticle(Member member, Article article);

}
