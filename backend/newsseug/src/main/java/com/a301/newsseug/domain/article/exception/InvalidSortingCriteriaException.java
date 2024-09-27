package com.a301.newsseug.domain.article.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;

public class InvalidSortingCriteriaException extends BaseException {
    public InvalidSortingCriteriaException() {
        super(ErrorCode.INVALID_CATEGORY_TYPE);
    }
}
