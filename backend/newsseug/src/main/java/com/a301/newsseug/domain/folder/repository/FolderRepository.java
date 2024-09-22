package com.a301.newsseug.domain.folder.repository;

import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.member.model.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, Long> {

    List<Folder> findAllByMember(Member member);

}
