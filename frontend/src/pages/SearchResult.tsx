import PressCard from 'components/search/PressCard';
import CategoryFilter from 'components/common/CategoryFilter';
import SubLayout from 'components/common/SubLayout';
import InputSection from 'components/search/InputSection';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PressDetail } from 'types/api/press';
import { getSearchResult } from 'apis/searchApi';
import { SearchResultInfo } from 'types/api/search';
import { useInfiniteQuery } from 'react-query';

function SearchResult() {
  const [searchParams] = useSearchParams();
  const keyword: string = searchParams.get('keyword') ?? '';
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [pressData, setPressData] = useState<PressDetail[]>([]);

  useEffect(() => {
    const fetchPressData = async () => {
      try {
        const result = await getSearchResult({
          keywordText: keyword,
          pageNumber: 0,
          category: activeCategory,
        });
        setPressData(result.press || []);
      } catch (error) {
        console.error('Press data load error:', error);
      }
    };

    if (keyword) {
      fetchPressData();
    }
  }, [keyword, activeCategory]);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery<SearchResultInfo>(
      ['searchArticles', keyword, activeCategory],
      ({ pageParam = 0 }) =>
        getSearchResult({
          keywordText: keyword,
          pageNumber: pageParam,
          category: activeCategory,
        }),
      {
        getNextPageParam: (lastPage) => {
          return lastPage.articles.sliceDetails.hasNext
            ? lastPage.articles.sliceDetails.currentPage + 1
            : undefined;
        },
        enabled: !!keyword,
      },
    );

  if (isLoading) return <div>로딩 중</div>;
  if (isError) return <div>검색 결과 조회 실패</div>;

  const allArticles = data?.pages.flatMap(
    (page) => page.articles.content || [],
  );

  return (
    <SubLayout isSearch={true}>
      <InputSection keywordText={keyword} />
      <>
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        {pressData.map((press: PressDetail) => (
          <PressCard
            key={press.id}
            id={press.id}
            name={press.name}
            imageUrl={press.imageUrl}
            isSubscribed={press.isSubscribed}
            description={press.description}
            subscribeCount={press.subscribeCount}
          />
        ))}
        <ArticleListCardGroup
          articleList={allArticles || []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </>
    </SubLayout>
  );
}

export default SearchResult;
