package com.a301.newsseug.domain.press.model.entity;

import com.a301.newsseug.global.model.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@Entity
@AllArgsConstructor
@Table(name = "press")
public class Press extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long pressId;

    @Embedded
    private PressBranding pressBranding;

    private String description;

    private Long subscribeCount;

//    Article과 합치기 전 주석 처리
//    @OneToMany(mappedBy = "press")
//    private List<Article> articles = new ArrayList<>();
}
