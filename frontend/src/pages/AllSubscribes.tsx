import SubscribeHeader from 'components/subscribe/SubscribeHeader';
import SubLayout from 'components/common/SubLayout';
import PressCardList from 'components/subscribe/PressCardList';
import useSubscription from 'hooks/useSubscription';
import { useState, useEffect } from 'react';

function AllSubscribes() {
  const {
    subscribeList,
    allPressList,
    subscriptionStatus,
    toggleSubscribe,
    handleSubscriptionUpdate,
  } = useSubscription();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) return setIsFirstLoad(false);
    window.addEventListener('beforeunload', handleSubscriptionUpdate);
    return () => {
      window.removeEventListener('beforeunload', handleSubscriptionUpdate);
      handleSubscriptionUpdate();
    };
  }, [isFirstLoad]);

  return (
    <SubLayout>
      <div>내 구독목록</div>
      <div>
        <SubscribeHeader
          title="구독한 언론사"
          subscribeNumber={subscribeList.length}
          variant="all"
        />
        <PressCardList
          pressList={subscribeList}
          subscriptionStatus={subscriptionStatus}
          toggleSubscribe={toggleSubscribe}
          isAll={false}
        />
        <SubscribeHeader title="전체 언론사" variant="all" />
        <PressCardList
          pressList={allPressList}
          subscriptionStatus={subscriptionStatus}
          toggleSubscribe={toggleSubscribe}
          isAll={true}
        />
      </div>
    </SubLayout>
  );
}

export default AllSubscribes;
