package com.a301.newsseug.domain.bookmark.repository;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.bookmark.model.entity.Bookmark;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.press.model.entity.Press;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface BookmarkCustomRepository {

    Slice<Bookmark> findAllByFolderWithSlice(Folder folder, Pageable pageable);

}
