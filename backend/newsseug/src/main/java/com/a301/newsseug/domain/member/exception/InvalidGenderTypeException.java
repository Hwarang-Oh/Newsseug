package com.a301.newsseug.domain.member.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidGenderTypeException extends BaseException {

    public InvalidGenderTypeException() {
        super(ErrorCode.INVALID_GENDER_TYPE);
    }

}
