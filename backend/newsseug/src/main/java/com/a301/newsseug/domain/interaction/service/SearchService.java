package com.a301.newsseug.domain.interaction.service;


import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.response.SearchResponse;
import com.a301.newsseug.external.elasticsearch.model.dto.response.SearchResponseForElastic;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import java.util.List;

public interface SearchService {

    SearchResponse search(CustomUserDetails userDetails, String keyword, String filter, int pageNumber);
    SlicedResponse<List<SearchResponseForElastic>> searchByElastic(CustomUserDetails userDetails, String keyword, int pageNumber);

}
