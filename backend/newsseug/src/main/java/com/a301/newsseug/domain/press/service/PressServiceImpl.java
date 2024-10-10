package com.a301.newsseug.domain.press.service;

import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.member.service.SubscribeService;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import java.util.HashSet;
import java.util.List;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.model.dto.response.GetPressDetailsResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;

import java.util.Objects;
import java.util.Set;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PressServiceImpl implements PressService {

    private final SubscribeService subscribeService;
    private final PressRepository pressRepository;
    private final SubscribeRepository subscribeRepository;

    @Override
    public List<GetPressResponse> getPress(CustomUserDetails userDetails) {

        Member member = userDetails.getMember();
        List<Press> press = pressRepository.findAll();
        Set<Press> subscribedPress =  new HashSet<>(
                subscribeRepository.findAllByMember(member).stream()
                        .map(Subscribe::getPress)
                        .toList()
        );

        return GetPressResponse.of(
                press,
                subscribedPress
        );

    }

    @Override
    public GetPressDetailsResponse getPressDetails(CustomUserDetails userDetails, Long pressId) {

        Press press = pressRepository.getOrThrow(pressId);

        if (Objects.nonNull(userDetails)) {
            return  GetPressDetailsResponse.of(press, subscribeService.isSubscribed(userDetails.getMember(), press));
        }

        return GetPressDetailsResponse.of(press);

    }

}
