package com.a301.newsseug.domain.folder.exception;

import com.a301.newsseug.global.exception.BaseException;
import com.a301.newsseug.global.exception.ErrorCode;

public class InaccessibleFolderException extends BaseException {

    public InaccessibleFolderException() {
        super(ErrorCode.INACCESSIBLE_FOLDER);
    }

}
