package com.a301.newsseug.domain.press.model.entity;

import com.a301.newsseug.global.model.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "press")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Press extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "press_seq")
    @SequenceGenerator(name = "press_seq", sequenceName = "press_seq", allocationSize = 1)
    private Long pressId;

    @Embedded
    private PressBranding pressBranding;

    private String description;

    private Long subscribeCount;

    @Builder
    public Press(
        String name, String imageUrl, String description
    ) {
        this.pressBranding = PressBranding.of(name, imageUrl);
        this.description = description;
        this.subscribeCount = 0L;
    }

    public void incrementSubscribeCount() {
        this.subscribeCount++;
    }

    public void decrementSubscribeCount() {

        if (this.subscribeCount== 0) {
            return;
        }

        this.subscribeCount--;

    }

}
