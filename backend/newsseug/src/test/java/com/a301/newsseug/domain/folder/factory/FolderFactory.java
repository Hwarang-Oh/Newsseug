package com.a301.newsseug.domain.folder.factory;

import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.member.factory.entity.MemberFactory;
import org.springframework.test.util.ReflectionTestUtils;

public class FolderFactory {

    public static Folder folder(Long id, String name) {

        Folder folder = Folder.builder()
                .name(name)
                .member(MemberFactory.memberOfKakao(1L))
                .build();


        ReflectionTestUtils.setField(folder, "folderId", id);

        return folder;

    }

}
