package com.a301.newsseug.domain.article.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidCategoryTypeException extends BaseException {

    public InvalidCategoryTypeException() {
        super(ErrorCode.INVALID_CATEGORY_TYPE);
    }

}
