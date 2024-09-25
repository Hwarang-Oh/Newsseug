package com.a301.newsseug.global.constant;

public class ErrorMessage {

    /**
     * [400 Bad Request]
     * - 응답 상태 코드는 서버가 클라이언트 오류를 감지해 요청 불가
     */
    public static final String FAIL_TO_VALIDATE_MESSAGE = "잘못된 요청입니다.";
    public static final String INVALID_PROVIDER_TYPE_MESSAGE = "유효하지 않은 제공자입니다.";
    public static final String INVALID_GENDER_TYPE_MESSAGE = "유효하지 않은 성별입니다.";
    public static final String INVALID_CATEGORY_TYPE_MESSAGE = "유효하지 않은 기사 카테고리입니다.";
    public static final String INVALID_REPORT_TYPE_MESSAGE = "유효하지 않은 신고입니다.";

    /**
     * [401 UnAuthorized]
     * - 요청된 리소스에 대한 유효한 인증 자격 증명이 없음
     */
    public static final String INACCESSIBLE_FOLDER_MESSAGE = "접근할 수 없는 폴더입니다.";

    /**
     * [403 Forbidden]
     * - 요청한 자원에 대해 권한 없음
     */
    public static final String UNTRUSTWORTHY_TOKEN_MESSAGE = "신뢰할 수 없는 토큰입니다.";

    /**
     * [404 Not Found]
     * - 존재하지 않는 자원
     */
    public static final String NOT_EXIST_MEMBER_MESSAGE = "존재하지 않는 사용자입니다.";
    public static final String NOT_EXIST_PRESS_MESSAGE = "존재하지 않는 언론사입니다.";
    public static final String NOT_EXIST_FOLDER_MESSAGE = "존재하지 않는 폴더입니다.";
    public static final String NOT_EXIST_ARTICLE_MESSAGE = "존재하지 않는 기사입니다.";
    public static final String NOT_EXIST_LIKE_MESSAGE = "존재하지 않는 좋아요입니다.";
    public static final String NOT_SUBSCRIBE_PRESS_MESSAGE = "구독하지 않은 언론사입니다.";

    /**
     * [500 INTERNAL_SERVER_ERROR]
     * - 서버 오류
     */
    public static final String FAIL_TO_ISSUE_TOKEN_MESSAGE = "토큰 발행을 실패했습니다.";

}
