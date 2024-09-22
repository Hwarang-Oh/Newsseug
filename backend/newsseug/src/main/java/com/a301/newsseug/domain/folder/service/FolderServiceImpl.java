package com.a301.newsseug.domain.folder.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.model.dto.FolderDto;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.folder.model.response.FolderListResponse;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class FolderServiceImpl implements FolderService {

    private final FolderRepository folderRepository;

    public FolderListResponse getFoldersByMember(CustomUserDetails userDetails) {

        Member loginMember = userDetails.getMember();

        List<Folder> folders = folderRepository.findAllByMember(loginMember);


        return FolderListResponse.of(
                folders.stream()
                        .map(folder ->
                                FolderDto.of(
                                        folder.getId(), folder.getName(), folder.getArticleCount()
                                )
                        )
                        .collect(Collectors.toList())
        );

    }

}
