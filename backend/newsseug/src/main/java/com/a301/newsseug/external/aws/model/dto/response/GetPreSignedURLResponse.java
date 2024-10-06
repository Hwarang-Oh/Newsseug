package com.a301.newsseug.external.aws.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.net.URL;
import lombok.Builder;

@Builder
@Schema(name = "업로드 URL 정보", description = "파일 업로드를 위한 URL 정보")
public record GetPreSignedURLResponse(

        @Schema(description = "pre-signed url")
        String preSignedUrl

) {

    public static GetPreSignedURLResponse of(URL url) {
        return GetPreSignedURLResponse.builder()
                .preSignedUrl(url.toString())
                .build();
    }

}
