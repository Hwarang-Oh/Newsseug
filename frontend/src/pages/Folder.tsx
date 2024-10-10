import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import SubLayout from 'components/common/SubLayout';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';
import { getFolderInfo } from 'apis/folderApi';
import { useParams } from 'react-router-dom';
import { FolderDetail } from 'types/api/folder';
import Spinner from 'components/common/Spinner';
import ErrorSection from 'components/common/ErrorSection';
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
  const sliceDetails =
    pages.length > 0 ? pages[pages.length - 1].articles.sliceDetails : {};

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
      {isLoading && <Spinner height="200px" />}
      {isError && (
        <ErrorSection
          height="200px"
          text="폴더 내 기사 목록을 불러오는 데 실패했어요...😥"
        />
      )}
      {allArticles && allArticles?.length > 0 ? (
        <ArticleListCardGroup
          articleList={allArticles || []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          sliceDetails={sliceDetails}
          articleFrom="folder"
          activeCategory="전체"
          folderId={Number(folderId)}
        />
      ) : (
        <ErrorSection height="500px" text="폴더 내 기사가 아직 없습니다." />
      )}
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
