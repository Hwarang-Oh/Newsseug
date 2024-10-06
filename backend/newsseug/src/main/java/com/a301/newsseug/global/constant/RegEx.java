package com.a301.newsseug.global.constant;

public class RegEx {

    public static final String[] EXCEPTION_URI_REGEX =  {
            "^(/v3/api-docs(/.*)?|/swagger-ui(/.*)?|/swagger-ui.html|/webjars(/.*)?|/swagger-resources(/.*)?)&",
            "^(/api/v1/auth(/.*)?)$",
            "^(/api/v1/articles(/.*)?)$",
            "^(/api/v1/press(/.*)?)$",
            "^(/api/v1/s3(/.*)?)$",
            "^(/newsseug(/.*)?)$"
    };

}
