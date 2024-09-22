package com.a301.newsseug.domain.press.exception;

import com.a301.newsseug.global.execption.BaseException;
import com.a301.newsseug.global.execption.ErrorCode;

public class NotSubscribePressException extends BaseException {
    public NotSubscribePressException() {
        super(ErrorCode.NOT_SUBSCRIBE_PRESS);
    }
}
