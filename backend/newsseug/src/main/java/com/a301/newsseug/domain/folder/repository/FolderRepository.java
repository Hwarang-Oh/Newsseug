package com.a301.newsseug.domain.folder.repository;

import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.model.entity.ActivateStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, Long> {

    Optional<Folder> findByFolderIdAndMemberAndStatus(Long id, Member member, ActivateStatus status);

    @EntityGraph(attributePaths = {"bookmark", "article"})
    List<Folder> findAllByMember(Member member);

    @EntityGraph(attributePaths = {"bookmark", "article"})
    Slice<Folder> findAllByMember(Member member, Pageable pageable);

}
