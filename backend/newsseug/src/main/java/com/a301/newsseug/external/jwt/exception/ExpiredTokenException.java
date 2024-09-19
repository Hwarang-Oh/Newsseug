package com.a301.newsseug.external.jwt.exception;

import com.a301.newsseug.global.execption.BaseException;
import com.a301.newsseug.global.execption.ErrorCode;

public class ExpiredTokenException extends BaseException {

    public ExpiredTokenException() {
        super(ErrorCode.UNTRUSTWORTHY_TOKEN);
    }

}
