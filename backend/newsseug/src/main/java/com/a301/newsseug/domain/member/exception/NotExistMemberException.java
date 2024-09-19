package com.a301.newsseug.domain.member.exception;

import com.a301.newsseug.global.execption.BaseException;
import com.a301.newsseug.global.execption.ErrorCode;

public class NotExistMemberException extends BaseException {
    public NotExistMemberException() {
        super(ErrorCode.NOT_EXIST_MEMBER);
    }
}
