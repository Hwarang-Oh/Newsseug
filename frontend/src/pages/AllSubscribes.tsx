import SubscribeHeader from 'components/subscribe/SubscribeHeader';
import SubLayout from 'components/common/SubLayout';
import PressCardList from 'components/subscribe/PressCardList';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { PressBasic } from 'types/api/press';
import {
  getAllPressList,
  getSubscribedPressList,
  subscribePress,
  unsubscribePress,
} from 'apis/subscribe';
import ErrorSection from 'components/common/ErrorSection';

function AllSubscribes() {
  const [subscribePressList, setSubscribePressList] = useState<PressBasic[]>(
    [],
  );
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    [key: number]: boolean;
  }>({});

  // 모든 언론사 리스트 가져오기
  const { data: allPressList } = useQuery<PressBasic[]>(
    ['allPressList'],
    getAllPressList,
  );

  // 구독된 언론사 리스트 가져오기
  const { data: initialSubscribedPressList } = useQuery<PressBasic[]>(
    ['subscribedPressList'],
    getSubscribedPressList,
  );

  // 구독 상태 초기화
  useEffect(() => {
    if (allPressList && initialSubscribedPressList) {
      const statusMap = allPressList.reduce(
        (acc, press) => {
          acc[press.id] = initialSubscribedPressList.some(
            (subscribed) => subscribed.id === press.id,
          );
          return acc;
        },
        {} as { [key: number]: boolean },
      );
      setSubscriptionStatus(statusMap);
      setSubscribePressList(initialSubscribedPressList);
    }
  }, [allPressList, initialSubscribedPressList]);

  // 구독 상태 토글 함수
  const toggleSubscribe = async (press: PressBasic) => {
    const isSubscribed = subscriptionStatus[press.id];
    const updatedStatus = !isSubscribed;

    try {
      // 구독 상태 변경 API 호출
      if (updatedStatus) {
        await subscribePress(press.id);
      } else {
        await unsubscribePress(press.id);
      }

      // 상태 업데이트
      setSubscriptionStatus((prevStatus) => ({
        ...prevStatus,
        [press.id]: updatedStatus,
      }));
      setSubscribePressList((prevList) => {
        return updatedStatus
          ? [...prevList, press]
          : prevList.filter((subscribed) => subscribed.id !== press.id);
      });
    } catch (error) {
      console.error(
        `Failed to ${updatedStatus ? 'subscribe to' : 'unsubscribe from'} press:`,
        error,
      );
    }
  };

  // 페이지 떠나기 전 구독 상태 업데이트
  // useEffect(() => {
  //   const handleSubscriptionUpdate = async () => {
  //     const subscribeIds = Object.keys(subscriptionStatus)
  //       .filter((id) => subscriptionStatus[Number(id)])
  //       .map(Number);
  //     const unsubscribeIds = Object.keys(subscriptionStatus)
  //       .filter((id) => !subscriptionStatus[Number(id)])
  //       .map(Number);

  //     try {
  //       await Promise.all([
  //         ...subscribeIds.map((id) => subscribePress(id)),
  //         ...unsubscribeIds.map((id) => unsubscribePress(id)),
  //       ]);

  //       await getSubscribedPressList();
  //     } catch (error) {
  //       console.error('구독 상태 동기화 실패:', error);
  //     }
  //   };
  //   handleSubscriptionUpdate();
  // }, [subscriptionStatus]);

  return (
    <SubLayout isAllSubPage={true} pressList={subscriptionStatus}>
      <div>내 구독 목록</div>
      <div>
        <SubscribeHeader
          title="구독한 언론사"
          subscribeNumber={subscribePressList.length}
          variant="all"
        />
        {subscribePressList.length > 0 ? (
          <PressCardList
            pressList={subscribePressList}
            subscriptionStatus={subscriptionStatus}
            toggleSubscribe={toggleSubscribe}
            isAll={false}
          />
        ) : (
          <ErrorSection height="100px" text="구독 중인 언론사가 없습니다." />
        )}

        <SubscribeHeader title="전체 언론사" variant="all" />
        <PressCardList
          pressList={allPressList || []}
          subscriptionStatus={subscriptionStatus}
          toggleSubscribe={toggleSubscribe}
          isAll={true}
        />
      </div>
    </SubLayout>
  );
}

export default AllSubscribes;
