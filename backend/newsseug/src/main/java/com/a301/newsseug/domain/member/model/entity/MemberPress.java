package com.a301.newsseug.domain.member.model.entity;


import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.global.model.entity.BaseEntity;
import com.fasterxml.jackson.databind.ser.Serializers.Base;
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
@Table(name = "members")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberPress extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "press_id")
    private Press press;

    @Builder
    public MemberPress(Member member, Press press) {
        this.member = member;
        this.press = press;
    }

}
