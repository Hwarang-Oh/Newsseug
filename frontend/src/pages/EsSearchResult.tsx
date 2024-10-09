import SubLayout from 'components/common/SubLayout';
import InputSection from 'components/search/InputSection';
import { useSearchParams } from 'react-router-dom';
import { getEsSearchResult } from 'apis/searchApi';
import { EsSearchResultInfo } from 'types/api/search';
import { useInfiniteQuery } from 'react-query';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';

function EsSearchResult() {
  const [searchParams] = useSearchParams();
  const keyword: string = searchParams.get('keyword') ?? '';

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<EsSearchResultInfo>(
    ['esSearchResult', keyword],
    ({ pageParam = 0 }) => getEsSearchResult(keyword, pageParam),
    {
      enabled: !!keyword,
      getNextPageParam: (lastPage) =>
        lastPage.sliceDetails.hasNext
          ? lastPage.sliceDetails.currentPage + 1
          : undefined,
    },
  );

  const pages = data?.pages || [];
  const resultList = pages.flatMap((page) => page.content) || [];

  if (isLoading) return <div>로딩 중</div>;
  if (isError) return <div>검색 결과 조회 실패</div>;

  return (
    <SubLayout isSearch={true}>
      <InputSection keywordText={keyword} />
      <ArticleListCardGroup
        resultList={resultList}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </SubLayout>
  );
}

export default EsSearchResult;
