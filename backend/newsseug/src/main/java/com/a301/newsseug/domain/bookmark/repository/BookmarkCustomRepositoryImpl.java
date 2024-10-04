package com.a301.newsseug.domain.bookmark.repository;

import static com.a301.newsseug.domain.bookmark.model.entity.QBookmark.bookmark;

import com.a301.newsseug.domain.bookmark.model.entity.Bookmark;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BookmarkCustomRepositoryImpl implements BookmarkCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Slice<Bookmark> findAllByFolderWithSlice(Folder folder, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder(bookmark.folder.eq(folder));
        return executeQuery(builder, pageable);
    }

    /**
     * 쿼리를 실행하고 Slice로 반환하는 메서드
     * @param builder BooleanBuilder에 추가된 조건
     * @param pageable 페이징 정보
     * @return Slice<Article>
     */
    private Slice<Bookmark> executeQuery(BooleanBuilder builder, Pageable pageable) {

        List<Bookmark> content = jpaQueryFactory
                .selectFrom(bookmark)
                .join(bookmark.article).fetchJoin()
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        boolean hasNext = content.size() > pageable.getPageSize();

        if (hasNext) {
            content.remove(content.size() - 1);
        }

        return new SliceImpl<>(content, pageable, hasNext);

    }


}
