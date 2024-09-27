package com.a301.newsseug.global.enums;

import com.a301.newsseug.domain.article.exception.InvalidSortingCriteriaException;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "정렬 기준")
public enum SortingCriteria {

    TIME("createdAt");

    private final String value;

    public static SortingCriteria convertToEnum(String reportValue) {

        SortingCriteria criteria;

        try{
            criteria = SortingCriteria.valueOf(reportValue.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidSortingCriteriaException();
        }

        return criteria;
    }

}
