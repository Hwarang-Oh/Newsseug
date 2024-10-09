package com.a301.newsseug.external.aws.service;

import com.a301.newsseug.external.aws.model.dto.response.GetPreSignedURLResponse;

public interface S3Service {

    GetPreSignedURLResponse generateUploadPreSignedUrl(String fileType, String entity, String id, String fileName);

}
