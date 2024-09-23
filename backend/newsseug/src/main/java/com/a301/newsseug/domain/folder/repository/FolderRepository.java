package com.a301.newsseug.domain.folder.repository;

import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.model.entity.ActivateStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, Long> {

    Optional<Folder> findByIdAndMemberAndStatus(Long id, Member member, ActivateStatus status);
    List<Folder> findAllByMember(Member member);

}
