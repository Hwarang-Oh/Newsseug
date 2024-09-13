package com.a301.newsseug.global.execption;

import static com.a301.newsseug.global.constant.ErrorMessage.*;

import com.a301.newsseug.global.constant.ErrorMessage;
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
    INVALID_PROVIDER_TYPE(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_PROVIDER_TYPE_MESSAGE);

    /**
     * [401 UnAuthorized]
     * - 요청된 리소스에 대한 유효한 인증 자격 증명이 없음
     */

    /**
     * [403 Forbidden]
     * - 요청한 자원에 대해 권한 없음
     */


    /**
     * [404 Not Found]
     * - 존재하지 않는 자원
     */


    /**
     * [500 INTERNAL_SERVER_ERROR]
     * - 서버 오류
     */

    private final HttpStatus status;
    private final String message;


}
