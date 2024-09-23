package com.a301.newsseug.external.jwt.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;

public class ExpiredTokenException extends BaseException {

    public ExpiredTokenException() {
        super(ErrorCode.UNTRUSTWORTHY_TOKEN);
    }

}
