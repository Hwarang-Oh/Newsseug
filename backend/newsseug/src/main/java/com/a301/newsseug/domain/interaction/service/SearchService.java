package com.a301.newsseug.domain.interaction.service;


import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.response.SearchResponse;

public interface SearchService {

    SearchResponse search(CustomUserDetails userDetails, String keyword, String filter, int pageNumber);

}
