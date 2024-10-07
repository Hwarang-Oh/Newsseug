import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import SubLayout from 'components/common/SubLayout';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';
import { getFolderInfo } from 'apis/folderApi';
import { useParams } from 'react-router-dom';
import { FolderDetail } from 'types/api/folder';
import useStoreArticleDispatch from 'hooks/useStoreArticleDispatch';
import { useEffect, useState } from 'react';
import { SliceDetails } from 'types/api/article';

function Folder() {
  const { folderId } = useParams();

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery<FolderDetail>(
      ['folderInfo', folderId],
      ({ pageParam = 0 }) => getFolderInfo(Number(folderId), pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage && lastPage.articles && lastPage.articles.sliceDetails) {
            return lastPage.articles.sliceDetails.hasNext
              ? lastPage.articles.sliceDetails.currentPage + 1
              : undefined;
          }
          return undefined;
        },
        enabled: !!folderId,
      },
    );

  const pages = data?.pages || [];
  console.log(pages);
  const SliceDetails =
    pages.length > 0 ? pages[pages.length - 1].articles.sliceDetails : {};

  const articleList = pages.flatMap((page) => page.articles.content) || [];
  useStoreArticleDispatch(
    articleList,
    SliceDetails,
    'folder',
    'ALL',
    null,
    Number(folderId),
  );

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    return <div>폴더 정보 조회 실패</div>;
  }

  const allArticles = data?.pages.flatMap(
    (page) => page.articles?.content || [],
  );

  return (
    <SubLayout>
      <ScrapTitle>{data?.pages[0].title}</ScrapTitle>
      <ArticleListCardGroup
        articleList={allArticles || []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </SubLayout>
  );
}

export default Folder;

const ScrapTitle = styled.span`
  max-width: 250px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
