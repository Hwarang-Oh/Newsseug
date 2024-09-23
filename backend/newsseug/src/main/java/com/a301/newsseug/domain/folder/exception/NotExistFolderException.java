package com.a301.newsseug.domain.folder.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;

public class NotExistFolderException extends BaseException {

    public NotExistFolderException() {
        super(ErrorCode.NOT_EXIST_FOLDER);
    }

}
