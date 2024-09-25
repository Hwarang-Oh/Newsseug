package com.a301.newsseug.domain.article.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidReportTypeException extends BaseException {

    public InvalidReportTypeException() {
        super(ErrorCode.INVALID_REPORT_TYPE);
    }

}
