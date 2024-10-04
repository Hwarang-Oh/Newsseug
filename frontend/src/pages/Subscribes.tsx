import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/index';
import { fetchSubscribedPress } from '../redux/subscribeSlice';
import { getPressArticleList } from 'apis/subscribe';
import { ArticleListCardProps } from 'types/common/common';
import MainLayout from 'components/common/MainLayout';
import CategoryFilter from 'components/common/CategoryFilter';
import SubscribeHeader from 'components/subscribe/SubscribeHeader';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import SubscribePressFilter from 'components/subscribe/SubscribePressFilter';

function Subscribes() {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [activePress, setActivePress] = useState<number | null>(null);
  const [articleList, setArticleList] = useState<ArticleListCardProps[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const dispatch = useDispatch();
  const { subscribedPress, loading, error } = useSelector(
    (state: RootState) => state.subscribedPress,
  );

  useEffect(() => {
    // subscribedPress에 값이 없을 때만 API 호출
    if (subscribedPress.length === 0) {
      dispatch(fetchSubscribedPress());
    }
  }, [dispatch, subscribedPress.length]);

  useEffect(() => {
    const fetchArticleList = async () => {
      const articles = await getPressArticleList(
        activePress,
        pageNumber,
        activeCategory,
      );
      setArticleList(articles.content);
    };
    fetchArticleList();
  }, [activePress, activeCategory]);

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
      <ArticleListCardGroup articleList={articleList} />
    </MainLayout>
  );
}

export default Subscribes;
