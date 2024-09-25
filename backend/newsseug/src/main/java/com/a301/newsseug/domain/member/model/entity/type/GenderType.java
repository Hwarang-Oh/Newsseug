package com.a301.newsseug.domain.member.model.entity.type;

import com.a301.newsseug.domain.member.exception.InvalidGenderTypeException;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "성별")
public enum GenderType {

    @Schema(description = "남자")
    MALE("male"),

    @Schema(description = "여자")
    FEMALE("female");

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
