package com.a301.newsseug.global.exception;

import static com.a301.newsseug.global.constant.ErrorMessage.*;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum ErrorCode {

    /**
     * [400 Bad Request]
     * - 응답 상태 코드는 서버가 클라이언트 오류를 감지해 요청 불가
     */
    FAIL_TO_VALIDATE(HttpStatus.BAD_REQUEST, FAIL_TO_VALIDATE_MESSAGE),
    INVALID_PROVIDER_TYPE(HttpStatus.BAD_REQUEST, INVALID_PROVIDER_TYPE_MESSAGE),
    INVALID_GENDER_TYPE(HttpStatus.BAD_REQUEST, INVALID_GENDER_TYPE_MESSAGE),
    INVALID_CATEGORY_TYPE(HttpStatus.BAD_REQUEST, INVALID_CATEGORY_TYPE_MESSAGE),
    INVALID_REPORT_TYPE(HttpStatus.BAD_REQUEST, INVALID_REPORT_TYPE_MESSAGE),
    INVALID_SORTING_CRITERIA_TYPE(HttpStatus.BAD_REQUEST, INVALID_SORTING_CRITERIA_MESSAGE),

    /**
     * [401 UnAuthorized]
     * - 요청된 리소스에 대한 유효한 인증 자격 증명이 없음
     */
    INACCESSIBLE_FOLDER(HttpStatus.UNAUTHORIZED, INACCESSIBLE_FOLDER_MESSAGE),

    /**
     * [403 Forbidden]
     * - 요청한 자원에 대해 권한 없음
     */
    UNTRUSTWORTHY_TOKEN(HttpStatus.FORBIDDEN, UNTRUSTWORTHY_TOKEN_MESSAGE),

    /**
     * [404 Not Found]
     * - 존재하지 않는 자원
     */
    NOT_EXIST_MEMBER(HttpStatus.NOT_FOUND, NOT_EXIST_MEMBER_MESSAGE),
    NOT_EXIST_PRESS(HttpStatus.NOT_FOUND, NOT_EXIST_PRESS_MESSAGE),
    NOT_EXIST_FOLDER(HttpStatus.NOT_FOUND, NOT_EXIST_FOLDER_MESSAGE),
    NOT_EXIST_ARTICLE(HttpStatus.NOT_FOUND, NOT_EXIST_ARTICLE_MESSAGE),
    NOT_EXIST_LIKE(HttpStatus.NOT_FOUND, NOT_EXIST_LIKE_MESSAGE),
    NOT_SUBSCRIBE_PRESS(HttpStatus.NOT_FOUND, NOT_SUBSCRIBE_PRESS_MESSAGE),


    /**
     * [500 INTERNAL_SERVER_ERROR]
     * - 서버 오류
     */
    FAIL_TO_ISSUE_TOKEN(HttpStatus.INTERNAL_SERVER_ERROR, FAIL_TO_ISSUE_TOKEN_MESSAGE);

    private final HttpStatus status;
    private final String message;


}
