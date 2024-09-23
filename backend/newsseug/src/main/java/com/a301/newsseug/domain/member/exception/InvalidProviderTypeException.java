package com.a301.newsseug.domain.member.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidProviderTypeException extends BaseException {

    public InvalidProviderTypeException() {
        super(ErrorCode.INVALID_PROVIDER_TYPE);
    }

}
