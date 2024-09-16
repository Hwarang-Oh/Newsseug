package com.a301.newsseug.external.jwt.exception;

import com.a301.newsseug.global.execption.BaseException;
import com.a301.newsseug.global.execption.ErrorCode;
import lombok.Getter;

@Getter
public class FailToIssueTokenException extends BaseException {

    public FailToIssueTokenException() {
        super(ErrorCode.FAIL_TO_ISSUE_TOKEN);
    }
}
