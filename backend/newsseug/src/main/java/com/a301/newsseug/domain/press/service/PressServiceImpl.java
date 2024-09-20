package com.a301.newsseug.domain.press.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.a301.newsseug.domain.press.model.dto.GetPressBrandingResponseDto;
import com.a301.newsseug.domain.press.model.dto.GetPressResponseDto;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.model.entity.PressBranding;
import com.a301.newsseug.domain.press.repository.PressRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PressServiceImpl implements PressService {
    private final PressRepository pressRepository;

    @Override
    public GetPressBrandingResponseDto getPressBranding() {

        List<Press> press = pressRepository.findAll();

        List<PressBranding> pressBranding = new ArrayList<>();
        for (Press p : press) {
            pressBranding.add(p.getPressBranding());
        }

        return new GetPressBrandingResponseDto(pressBranding);
    }

    @Override
    public Optional<GetPressResponseDto> getPress(Long pressId) {

        Optional<Press> optionalPress = pressRepository.findById(pressId);

        if (optionalPress.isEmpty()) {
            return Optional.empty();
        }

        Press press = optionalPress.get();

        return Optional.of(GetPressResponseDto.builder()
            .pressId(press.getPressId())
            .name(press.getPressBranding().getName())
            .imageUrl(press.getPressBranding().getImageUrl())
            .description(press.getDescription())
            .subscribeCount(press.getSubscribeCount())
            .build());
    }
}
