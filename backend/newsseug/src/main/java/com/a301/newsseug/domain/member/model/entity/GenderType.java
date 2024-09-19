package com.a301.newsseug.domain.member.model.entity;

import com.a301.newsseug.domain.member.exception.InvalidGenderTypeException;
import com.a301.newsseug.domain.member.exception.InvalidProviderTypeException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GenderType {

    MALE("male"), FEMALE("female");

    private final String value;

    public static GenderType convertToEnum(String type) {

        GenderType genderType;

        try {
            genderType = GenderType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidGenderTypeException();
        }

        return genderType;

    }

}
