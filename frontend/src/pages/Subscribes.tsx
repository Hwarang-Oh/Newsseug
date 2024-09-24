import SubscribeHeader from 'components/subscribe/SubscribeHeader';
import CategoryFilter from 'components/common/CategoryFilter';
import MainLayout from 'components/common/MainLayout';
import { useState } from 'react';
import SubscribePressFilter from 'components/subscribe/SubscribePressFilter';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';

import data from 'db/data.json';
const subscribeNumber = 6;

function Subscribes() {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [activePress, setActivePress] = useState<string | null>(null);

  return (
    <MainLayout>
      <SubscribeHeader
        title="구독한 언론사"
        subscribeNumber={subscribeNumber}
        variant="subscribed"
      />
      <SubscribePressFilter
        subscribeData={data.subscribeData}
        activePress={activePress}
        setActivePress={setActivePress}
      />
      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ArticleListCardGroup articleList={data.articles} />
    </MainLayout>
  );
}

export default Subscribes;
