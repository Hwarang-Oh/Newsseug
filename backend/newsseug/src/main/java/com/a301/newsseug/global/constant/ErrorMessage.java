package com.a301.newsseug.global.constant;

public class ErrorMessage {

    /**
     * [400 Bad Request]
     * - 응답 상태 코드는 서버가 클라이언트 오류를 감지해 요청 불가
     */
    public static final String FAIL_TO_VALIDATE_MESSAGE = "잘못된 요청입니다.";
    public static final String INVALID_PROVIDER_TYPE_MESSAGE = "유효하지 않은 제공자입니다.";

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
    public static final String FAIL_TO_ISSUE_TOKEN_MESSAGE = "토큰 발행을 실패했습니다.";

}
