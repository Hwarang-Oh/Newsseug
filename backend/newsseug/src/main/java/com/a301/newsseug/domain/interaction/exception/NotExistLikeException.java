package com.a301.newsseug.domain.interaction.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;

public class NotExistLikeException extends BaseException {
    public NotExistLikeException() {
        super(ErrorCode.NOT_EXIST_LIKE);
    }
}
