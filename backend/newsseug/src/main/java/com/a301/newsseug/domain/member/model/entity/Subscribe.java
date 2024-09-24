package com.a301.newsseug.domain.member.model.entity;


import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.global.model.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(
        name = "subscribes",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uniqueSubscribe",
                        columnNames = {"member_id", "press_id"}
                )
        }
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Subscribe extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long subscribeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "press_id")
    private Press press;

    @Builder
    public Subscribe(Member member, Press press) {
        this.member = member;
        this.press = press;
    }

}
