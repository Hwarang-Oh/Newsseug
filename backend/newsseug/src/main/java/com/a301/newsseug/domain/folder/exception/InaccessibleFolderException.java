package com.a301.newsseug.domain.folder.exception;

import com.a301.newsseug.global.execption.BaseException;
import com.a301.newsseug.global.execption.ErrorCode;

public class InaccessibleFolderException extends BaseException {

    public InaccessibleFolderException() {
        super(ErrorCode.INACCESSIBLE_FOLDER);
    }

}
