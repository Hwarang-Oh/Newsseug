package com.a301.newsseug.domain.bookmark.repository;

import com.a301.newsseug.domain.bookmark.model.entity.Bookmark;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long>, BookmarkCustomRepository {

    @EntityGraph(attributePaths = "article")
    List<Bookmark> findAllByFolder(Folder folder);
}
