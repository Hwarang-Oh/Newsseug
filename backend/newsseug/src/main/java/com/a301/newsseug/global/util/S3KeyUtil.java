package com.a301.newsseug.global.util;

import static com.a301.newsseug.global.constant.StringFormat.S3_FILE_PATH;

public class S3KeyUtil {

    /**
     * @param fileType  파일의 종류 (예: profile, thumbnail 등)
     * @param entity    객체 (예: member, press 등)
     * @param id        객체 식별자
     * @param fileName  파일의 이름 (확장자를 포함)
     * @return S3 객체키
     */
    public static String generateKey(String fileType, String entity, Long id, String fileName) {
        return S3_FILE_PATH.formatted(fileType, entity, id, fileName);
    }

}