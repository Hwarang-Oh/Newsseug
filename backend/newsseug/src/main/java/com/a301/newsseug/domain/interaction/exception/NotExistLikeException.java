package com.a301.newsseug.domain.interaction.exception;

import com.a301.newsseug.global.execption.BaseException;
import com.a301.newsseug.global.execption.ErrorCode;

public class NotExistLikeException extends BaseException {
    public NotExistLikeException() {
        super(ErrorCode.NOT_EXIST_LIKE);
    }
}
