import { getMemberHistoryList } from 'apis/memberApi';
import { PageType } from 'types/api/article';
import useContentsFetch from 'hooks/useContentsFetch';
import SubLayout from 'components/common/SubLayout';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import useStoreArticleDispatch from 'hooks/useStoreArticleDispatch';

function History() {
  const {
    articleList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    sliceDetails,
  } = useContentsFetch<PageType>({
    queryKey: ['myPageHistory'],
    fetchData: getMemberHistoryList,
  });

  useStoreArticleDispatch(articleList, sliceDetails, 'history');

  return (
    <SubLayout>
      <span>내 시청 기록</span>
      <ArticleListCardGroup
        articleList={articleList || []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </SubLayout>
  );
}

export default History;
