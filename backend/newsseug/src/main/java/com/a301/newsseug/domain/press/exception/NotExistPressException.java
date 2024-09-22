package com.a301.newsseug.domain.press.exception;

import com.a301.newsseug.global.execption.BaseException;
import com.a301.newsseug.global.execption.ErrorCode;

public class NotExistPressException extends BaseException {
    public NotExistPressException() {
        super(ErrorCode.NOT_EXIST_PRESS);
    }
}
