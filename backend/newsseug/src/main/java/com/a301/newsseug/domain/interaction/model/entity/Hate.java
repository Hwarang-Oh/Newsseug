package com.a301.newsseug.domain.interaction.model.entity;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.util.ClockUtil;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "hates")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Hate {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long hateId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @CreatedDate
    @Column(updatable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    @Builder
    public Hate(Member member, Article article) {

        this.member = member;
        this.article = article;

    }

    @PrePersist
    protected void onPrePersist() {
        this.createdAt = ClockUtil.getLocalDateTime();
    }

}
