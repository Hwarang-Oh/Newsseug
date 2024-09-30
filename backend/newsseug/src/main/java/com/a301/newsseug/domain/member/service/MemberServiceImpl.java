package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.model.dto.request.UpdateMemberRequest;
import com.a301.newsseug.domain.member.model.dto.response.GetMemberFolderResponse;
import com.a301.newsseug.domain.member.model.dto.response.GetMemberResponse;
import com.a301.newsseug.domain.member.model.entity.type.GenderType;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.exception.NotSubscribePressException;
import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
import com.a301.newsseug.domain.press.model.dto.response.ListSimplePressResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final PressRepository pressRepository;
    private final SubscribeRepository subscribeRepository;
    private final FolderRepository folderRepository;

    @Override
    @Transactional(readOnly = true)
    public GetMemberResponse getMember(CustomUserDetails userDetails) {

        Member loginMember = userDetails.getMember();
        return GetMemberResponse.of(loginMember.getNickname(), loginMember.getProfileImageUrl());

    }

    @Override
    public void updateMember(CustomUserDetails UserDetails, UpdateMemberRequest request) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        Member loginMember = UserDetails.getMember();

        loginMember.setNickname(request.nickname());
        loginMember.setGender(GenderType.convertToEnum(request.gender()));
        loginMember.setBirth(LocalDate.parse(request.birth(), formatter));

    }

    @Override
    @Transactional(readOnly = true)
    public ListSimplePressResponse getPressByMember(CustomUserDetails userDetails) {

        Member loginMember = userDetails.getMember();
        List<Subscribe> subscribes = subscribeRepository.findAllByMember(loginMember);

        return ListSimplePressResponse.of(
                SimplePressDto.fromSubscribe(subscribes)
        );

    }

    @Override
    @Transactional(readOnly = true)
    public List<GetMemberFolderResponse> getFoldersByMember(CustomUserDetails userDetails) {

        Member loginMember = userDetails.getMember();
        List<Folder> folders = folderRepository.findAllByMember(loginMember);
        return GetMemberFolderResponse.of(folders);

    }

    @Override
    public void subscribe(CustomUserDetails userDetails, Long pressId) {

        Member loginMember = userDetails.getMember();
        Press press = pressRepository.getOrThrow(pressId);

        Optional<Subscribe> subscribe = subscribeRepository.findByMemberAndPress(loginMember, press);

        if (subscribe.isPresent()) {
            subscribe.get().active();
            return;
        }

        subscribeRepository.save(
                Subscribe.builder()
                        .member(loginMember)
                        .press(press)
                        .build()
        );

    }

    @Override
    public void unsubscribe(CustomUserDetails userDetails, Long pressId) {

        Member loginMember = userDetails.getMember();
        Press press = pressRepository.getOrThrow(pressId);

        Subscribe subscribe = subscribeRepository.findByMemberAndPress(loginMember, press)
                .orElseThrow(NotSubscribePressException::new);

        subscribe.inactive();

    }

}
