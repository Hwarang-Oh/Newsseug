package com.a301.newsseug.external.jwt.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;

public class InvalidSignatureException extends BaseException {

    public InvalidSignatureException() {
        super(ErrorCode.UNTRUSTWORTHY_TOKEN);
    }

}
