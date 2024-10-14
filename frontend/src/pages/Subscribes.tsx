import { useQuery } from 'react-query';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { PressBasic } from 'types/api/press';
import { Category, PageType } from 'types/api/article';
import { fetchArticlesByPress } from 'apis/articleApi';
import { getSubscribedPressList } from 'apis/subscribe';
import { updateSubscribedPress } from '../redux/subscribeSlice';
import Spinner from 'components/common/Spinner';
import useContentsFetch from 'hooks/useContentsFetch';
import MainLayout from 'components/common/MainLayout';
import ErrorSection from 'components/common/ErrorSection';
import CategoryFilter from 'components/common/CategoryFilter';
import SubscribeHeader from 'components/subscribe/SubscribeHeader';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import SubscribePressFilter from 'components/subscribe/SubscribePressFilter';

function Subscribes() {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [activePress, setActivePress] = useState<number | null>(null);

  const {
    data: subscribedPressList,
    isLoading: isPressLoading,
    isError: isPressError,
    refetch,
  } = useQuery<PressBasic[]>(
    ['subscribedPressList'],
    () => getSubscribedPressList(),
    {
      onSuccess: (data) => {
        updateSubscribedPress(data);
      },
    },
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const {
    articleList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    sliceDetails,
    isLoading,
    isError,
  } = useContentsFetch<PageType>({
    queryKey: [
      'subscribedArticles',
      String(activePress),
      Category[activeCategory as keyof typeof Category],
    ],
    fetchData: fetchArticlesByPress,
    category: Category[activeCategory as keyof typeof Category],
    pressId: activePress,
  });

  return (
    <MainLayout>
      <StickyWrapper>
        <SubscribeHeader
          title="구독한 언론사"
          subscribeNumber={subscribedPressList?.length}
          variant="subscribed"
        />
        {!isPressError &&
          !isPressLoading &&
          subscribedPressList?.length === 0 && (
            <ErrorSection height="100px" text="구독한 언론사가 없습니다." />
          )}
        {subscribedPressList && (
          <SubscribePressFilter
            subscribeData={subscribedPressList}
            activePress={activePress}
            setActivePress={setActivePress}
          />
        )}
        {isPressLoading && <Spinner height="100px" />}
        {isPressError && (
          <ErrorSection
            height="100px"
            text="구독 목록을 불러오는 데 실패했어요...😥"
          />
        )}
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </StickyWrapper>
      {isLoading && <Spinner height="400px" />}
      {isError && (
        <ErrorSection
          height="400px"
          text="기사를 불러오는 데 실패했어요...😥"
        />
      )}
      {articleList.length > 0 ? (
        <ArticleListCardGroup
          articleList={articleList || []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          sliceDetails={sliceDetails}
          articleFrom="press"
          activeCategory={activeCategory}
          activePress={activePress}
        />
      ) : (
        <ErrorSection height="400px" text="기사가 없습니다." />
      )}
    </MainLayout>
  );
}

export default Subscribes;

const StickyWrapper = styled.div`
  position: sticky;
  top: 48px;
  background-color: ${({ theme }) => theme.bgColor};
  z-index: 10;
  overflow-x: auto;
`;
