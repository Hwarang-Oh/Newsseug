package com.a301.newsseug.domain.folder.model.entity;

import com.a301.newsseug.domain.member.model.entity.Member;
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

@Getter
@Entity
@Table(name = "folders")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Folder {

    @Id
    @Column(name = "folder_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(columnDefinition = "VARCHAR(10)", nullable = false)
    private String name;

    private Long articleCount;

    @Builder
    public Folder(String name, Member member) {
        this.name = name;
        this.member = member;
        this.articleCount = 0L;
    }

}
