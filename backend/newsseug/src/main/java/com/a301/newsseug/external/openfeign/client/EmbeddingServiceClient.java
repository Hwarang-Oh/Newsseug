package com.a301.newsseug.external.openfeign.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "embeddingServiceClient", url = "https://j11a301.p.ssafy.io/ai")
public interface EmbeddingServiceClient {

    @GetMapping("/embedd/")
    float[] getEmbeddingVector(@RequestParam("keyword") String keyword);

}
