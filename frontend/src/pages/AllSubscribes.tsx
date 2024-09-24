import { useEffect, useState } from 'react';
import SubscribeHeader from 'components/subscribe/SubscribeHeader';
import SubLayout from 'components/common/SubLayout';
import PressCardList from 'components/subscribe/PressCardList';
import { PressInfo } from 'types/subscribe';

import data from 'db/data.json';

function AllSubscribes() {
  // 구독한 언론사 리스트 객체
  const [subscribeList, setSubscribeList] = useState<PressInfo[]>(
    data.subscribeData,
  );

  // 전체 언론사에 대해 구독 여부 저장하는 id:isSubscribed 형태의 객체 상태
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    [key: string]: boolean;
  }>(() => {
    return data.allPress.reduce(
      (acc, press) => {
        acc[press.id] = press.isSubscribed;
        return acc;
      },
      {} as { [key: string]: boolean },
    );
  });

  // 구독 or 구독 취소 토글
  const toggleSubscribe = (press: PressInfo) => {
    const isSubscribed = subscriptionStatus[press.id];
    // 구독 상태 변경
    setSubscriptionStatus((prev) => ({
      ...prev,
      [press.id]: !prev[press.id],
    }));

    // 구독 리스트 업데이트
    if (isSubscribed) {
      setSubscribeList((prev) => prev.filter((p) => p.id !== press.id));
    } else {
      setSubscribeList((prev) => [
        ...prev,
        {
          id: press.id,
          pressName: press.pressName,
          imgUrl: press.imgUrl,
        },
      ]);
    }
  };

  const preventClose = (e: BeforeUnloadEvent) => {
    // 페이지 닫기 & 새로고침 감지;
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  const preventGoBack = () => {
    // 페이지 뒤로가기 감지
    window.history.go(-1);
  };

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

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
        />
        <SubscribeHeader title="전체 언론사" variant="all" />
        <PressCardList
          pressList={data.allPress}
          subscriptionStatus={subscriptionStatus}
          toggleSubscribe={toggleSubscribe}
        />
      </div>
    </SubLayout>
  );
}

export default AllSubscribes;
