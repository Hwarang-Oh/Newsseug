package com.a301.newsseug.domain.article.exception;

import com.a301.newsseug.global.execption.BaseException;
import com.a301.newsseug.global.execption.ErrorCode;

public class NotExistArticleException extends BaseException {
    public NotExistArticleException() {
        super(ErrorCode.NOT_EXIST_PRESS);
    }
}
