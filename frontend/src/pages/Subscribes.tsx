import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/index';
import { fetchSubscribedPress } from '../redux/subscribeSlice';
import { fetchArticlesByPress } from 'apis/articleApi';
import { Category, PageType } from 'types/api/article';
import useContentsFetch from 'hooks/useContentsFetch';
import MainLayout from 'components/common/MainLayout';
import CategoryFilter from 'components/common/CategoryFilter';
import SubscribeHeader from 'components/subscribe/SubscribeHeader';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import SubscribePressFilter from 'components/subscribe/SubscribePressFilter';
import Spinner from 'components/common/Spinner';
import ErrorSection from '@/components/common/ErrorSection';

function Subscribes() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [activePress, setActivePress] = useState<number | null>(null);

  const { subscribedPress, error } = useSelector(
    (state: RootState) => state.subscribedPress,
  );

  useEffect(() => {
    dispatch(fetchSubscribedPress());
  }, [dispatch]);

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
      <SubscribeHeader
        title="구독한 언론사"
        subscribeNumber={subscribedPress.length}
        variant="subscribed"
      />
      <SubscribePressFilter
        subscribeData={subscribedPress}
        activePress={activePress}
        setActivePress={setActivePress}
      />
      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
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
