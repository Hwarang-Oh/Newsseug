import SubscribeHeader from 'components/subscribe/SubscribeHeader';
import CategoryFilter from 'components/common/CategoryFilter';
import MainLayout from 'components/common/MainLayout';
import { useEffect, useState } from 'react';
import SubscribePressFilter from 'components/subscribe/SubscribePressFilter';
import { getSubscribedPressList } from 'apis/subscribe';
import { PressInfo } from 'types/subscribe';

function Subscribes() {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [activePress, setActivePress] = useState<string | null>(null);

  const [subscribedPress, setSubscribedPress] = useState<PressInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscribedPress = async () => {
      try {
        const data = await getSubscribedPressList();
        setSubscribedPress(data);
      } catch (error) {
        setError('Failed to fetch subscribed press');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribedPress(); // 데이터 로드 실행
  }, []);

  // 로딩 상태 처리
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
      {/* <ArticleListCardGroup articleList={data.articles} /> */}
    </MainLayout>
  );
}

export default Subscribes;
