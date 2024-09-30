package com.a301.newsseug.domain.bookmark.factory.request;

import com.a301.newsseug.domain.bookmark.model.dto.request.CreateBookmarkRequest;
import java.util.List;

public class BookmarkRequestFactory {

    public static CreateBookmarkRequest createBookmarkRequest(Long articleId, List<Long> folderIds) {
        return new CreateBookmarkRequest(
                articleId, folderIds
        );
    }


}
