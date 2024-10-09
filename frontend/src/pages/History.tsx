import { getMemberHistoryList } from 'apis/memberApi';
import { PageType } from 'types/api/article';
import useContentsFetch from 'hooks/useContentsFetch';
import SubLayout from 'components/common/SubLayout';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import ErrorSection from 'components/common/ErrorSection';
import Spinner from 'components/common/Spinner';

function History() {
  const {
    articleList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    sliceDetails,
    isError,
    isLoading,
  } = useContentsFetch<PageType>({
    queryKey: ['myPageHistory'],
    fetchData: getMemberHistoryList,
  });
  return (
    <SubLayout>
      <span>내 시청 기록</span>
      {isError && (
        <ErrorSection
          text="시청 기록을 불러오는 데 실패했어요.😥"
          height="300px"
        />
      )}
      {isLoading && <Spinner height="300px" />}
      {articleList.length > 0 ? (
        <ArticleListCardGroup
          articleList={articleList || []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          sliceDetails={sliceDetails}
          articleFrom="history"
        />
      ) : (
        <ErrorSection text="❌시청 기록이 없습니다." height="300px" />
      )}
    </SubLayout>
  );
}

export default History;
