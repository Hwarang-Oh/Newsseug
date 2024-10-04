import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import SubLayout from 'components/common/SubLayout';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';
import { getFolderInfo } from 'apis/folderApi';
import { useParams } from 'react-router-dom';
import { FolderDetail } from 'types/api/folder';

function Folder() {
  const { folderId } = useParams();

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery<FolderDetail>(
      ['folderInfo', folderId],
      ({ pageParam = 0 }) => getFolderInfo(Number(folderId), pageParam),
      {
        getNextPageParam: (lastPage) => {
          // lastPage가 존재하고, lastPage의 구조가 정확한지 확인
          if (lastPage && lastPage.articles && lastPage.articles.sliceDetails) {
            return lastPage.articles.sliceDetails.hasNext
              ? lastPage.articles.sliceDetails.currentPage + 1
              : undefined;
          }
          return undefined; // lastPage가 없으면 undefined 반환
        },
        enabled: !!folderId,
      },
    );

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    return <div>폴더 정보 조회 실패</div>;
  }

  // 모든 페이지의 기사 데이터를 하나로 합치기
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
