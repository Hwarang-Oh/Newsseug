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
import useStoreArticleDispatch from 'hooks/useStoreArticleDispatch';

function Subscribes() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [activePress, setActivePress] = useState<number | null>(null);

  const { subscribedPress, loading, error } = useSelector(
    (state: RootState) => state.subscribedPress,
  );

  useEffect(() => {
    // subscribedPress에 값이 없을 때만 API 호출
    if (subscribedPress.length === 0) {
      dispatch(fetchSubscribedPress());
    }
  }, [dispatch, subscribedPress.length]);

  const {
    articleList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    sliceDetails,
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

  useStoreArticleDispatch(
    articleList,
    sliceDetails,
    'press',
    Category[activeCategory as keyof typeof Category],
    activePress,
  );

  // 로딩 상태 처리
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message}</p>;

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
      <ArticleListCardGroup
        articleList={articleList || []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </MainLayout>
  );
}

export default Subscribes;
