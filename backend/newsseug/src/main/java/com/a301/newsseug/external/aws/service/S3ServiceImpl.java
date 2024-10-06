package com.a301.newsseug.external.aws.service;


import com.a301.newsseug.external.aws.config.AwsProperties;
import com.a301.newsseug.external.aws.model.dto.response.GetPreSignedURLResponse;
import com.a301.newsseug.global.util.S3KeyUtil;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

    private final AwsProperties awsProperties;
    private final S3Presigner s3Presigner;

    @Override
    public GetPreSignedURLResponse generateUploadPreSignedUrl(String fileType, String entity, Long id, String fileName) {

        String key = S3KeyUtil.generateKey(fileType, entity, id, fileName);
        log.info("Generate Object Key -> {}", key);

        PutObjectPresignRequest preSignedRequest = PutObjectPresignRequest.builder()
                .putObjectRequest(p -> p.bucket(awsProperties.s3().bucket()).key(key))
                .signatureDuration(Duration.ofSeconds(awsProperties.s3().duration()))
                .build();

        return GetPreSignedURLResponse.of(s3Presigner.presignPutObject(preSignedRequest).url());

    }

}
