package com.a301.newsseug.domain.folder.model.entity;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.model.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Table(name = "folders")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Folder extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long folderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(columnDefinition = "VARCHAR(10)", nullable = false)
    private String title;

    @Setter
    private String thumbnailUrl;

    private Long articleCount;

    @Builder
    public Folder(Member member, String title, String thumbnailUrl) {
        this.title = title;
        this.member = member;
        this.thumbnailUrl = thumbnailUrl;
        this.articleCount = 0L;
    }

}
