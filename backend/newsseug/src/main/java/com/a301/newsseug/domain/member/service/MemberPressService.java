package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import java.util.List;

public interface MemberPressService {

    List<GetPressResponse> getPressByMember(CustomUserDetails userDetails);

    void subscribe(CustomUserDetails userDetails, Long pressId);

    void unsubscribe(CustomUserDetails userDetails, Long pressId);

}
