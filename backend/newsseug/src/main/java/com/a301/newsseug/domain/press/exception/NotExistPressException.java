package com.a301.newsseug.domain.press.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;

public class NotExistPressException extends BaseException {
    public NotExistPressException() {
        super(ErrorCode.NOT_EXIST_PRESS);
    }
}
