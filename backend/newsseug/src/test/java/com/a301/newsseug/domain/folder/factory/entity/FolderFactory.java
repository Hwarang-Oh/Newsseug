package com.a301.newsseug.domain.folder.factory.entity;

import static com.a301.newsseug.domain.folder.factory.fixtures.FolderFixtures.*;

import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.member.factory.entity.MemberFactory;
import org.springframework.test.util.ReflectionTestUtils;

public class FolderFactory {

    public static Folder folder(Long id) {

        Folder folder = Folder.builder()
                .title(title)
                .member(MemberFactory.memberOfKakao(1L))
                .thumbnailUrl(thumbnailUrl)
                .build();


        ReflectionTestUtils.setField(folder, "folderId", id);

        return folder;

    }

}
