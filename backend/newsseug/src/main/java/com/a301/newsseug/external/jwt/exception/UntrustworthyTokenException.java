package com.a301.newsseug.external.jwt.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;

public class UntrustworthyTokenException extends BaseException {

    public UntrustworthyTokenException() {
        super(ErrorCode.UNTRUSTWORTHY_TOKEN);
    }

}
