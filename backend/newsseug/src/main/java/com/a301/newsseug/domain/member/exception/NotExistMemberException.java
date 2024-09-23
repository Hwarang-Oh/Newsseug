package com.a301.newsseug.domain.member.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;

public class NotExistMemberException extends BaseException {
    public NotExistMemberException() {
        super(ErrorCode.NOT_EXIST_MEMBER);
    }
}
