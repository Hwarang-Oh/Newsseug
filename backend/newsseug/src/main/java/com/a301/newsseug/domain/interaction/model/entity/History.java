package com.a301.newsseug.domain.interaction.model.entity;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.model.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "histories")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class History extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "histories_seq")
    @SequenceGenerator(name = "histories_seq", sequenceName = "histories_seq", allocationSize = 1)
    private Long historyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @Column(nullable = false)
    private int playTime;

    @Builder
    public History(Member member, Article article, int playTime) {
        this.member = member;
        this.article = article;
        this.playTime = playTime;
    }

}
