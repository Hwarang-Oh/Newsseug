package com.a301.newsseug.domain.interaction.repository;

import com.a301.newsseug.domain.article.exception.NotExistArticleException;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.interaction.model.entity.Like;
import com.a301.newsseug.domain.member.model.entity.Member;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends CrudRepository<Like, Long> {

    default Like getOrThrow(Member member, Article article) {
        return findByMemberAndArticle(member, article).orElseThrow(NotExistArticleException::new);
    }

    Optional<Like> findByMemberAndArticle(Member member, Article article);

}
