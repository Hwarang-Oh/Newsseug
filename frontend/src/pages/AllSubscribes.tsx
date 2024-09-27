import { useEffect, useState } from 'react';
import SubscribeHeader from 'components/subscribe/SubscribeHeader';
import SubLayout from 'components/common/SubLayout';
import PressCardList from 'components/subscribe/PressCardList';
import { AllPressInfo, PressInfo } from '@/types/props/subscribe';

import {
  getAllPressList,
  subscribePress,
  unsubscribePress,
} from 'apis/subscribe';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/index';
import {
  fetchSubscribedPress,
  updateSubscribedPress,
} from '../redux/subscribeSlice';

function AllSubscribes() {
  const dispatch = useDispatch();

  // Redux에서 subscribedPress 가져오기
  const { subscribedPress } = useSelector(
    (state: RootState) => state.subscribedPress,
  );

  // 구독한 언론사 리스트 객체
  const [allPressList, setAllPressList] = useState<AllPressInfo[]>([]);
  const [subscribeList, setSubscribeList] = useState<PressInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscribed = async () => {
      try {
        // store에 저장된 구독 리스트가 없으면 API 호출
        if (subscribedPress.length === 0) {
          dispatch(fetchSubscribedPress());
        }

        // 전체 언론사 목록 가져오기
        const allPressData = await getAllPressList();
        setAllPressList(allPressData);

        // store에 있는 구독한 언론사 목록을 사용
        setSubscribeList(subscribedPress);
      } catch (error) {
        setError('Failed to fetch press data');
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribed();
  }, [dispatch, subscribedPress]);

  // 전체 언론사에 대해 구독 여부 저장하는 id:isSubscribed 형태의 객체 상태
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    [key: string]: boolean;
  }>({});

  // 구독 상태 초기화: 구독 여부를 allPressList와 subscribeList에서 설정
  useEffect(() => {
    const status = allPressList.reduce(
      (acc, press) => {
        acc[press.id] = subscribeList.some(
          (subPress) => subPress.id === press.id,
        );
        return acc;
      },
      {} as { [key: string]: boolean },
    );
    setSubscriptionStatus(status);
  }, [allPressList, subscribeList]);

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
          name: press.name,
          imgUrl: press.imgUrl,
        },
      ]);
    }
  };

  // 페이지 이탈 시 구독 상태 비교
  // subscribeList = 현재 페이지에서 관리하고 있는 구독한 언론사
  // subscribedPress = 전역적으로 관리되고 있는 store에 저장되어 있는 구독한 언론사
  const handleSubscribeState = async () => {
    const newSubscribe = subscribeList.filter(
      (press) =>
        !subscribedPress.some(
          (subPress: PressInfo) => subPress.id === press.id,
        ),
    );

    const removeSubscribe: PressInfo[] = subscribedPress.filter(
      (press: PressInfo) =>
        !subscribeList.some((subPress) => subPress.id === press.id),
    );

    await Promise.all(newSubscribe.map((press) => subscribePress(press.id)));
    await Promise.all(
      removeSubscribe.map((press) => unsubscribePress(press.id)),
    );

    dispatch(updateSubscribedPress(subscribeList));
  };

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    const handleUnload = (e: BeforeUnloadEvent) => {
      handleSubscribeState();
    };

    const handlePopstate = (event: PopStateEvent) => {
      // 뒤로가기를 눌렀을 때 API 호출
      console.log('뒤로가기가 감지되었습니다');
      handleSubscribeState();
      window.history.go(-1);
    };

    if (isFirstLoad) {
      // 페이지가 처음 로드될 때만 히스토리 상태를 pushState로 추가
      window.history.pushState({ page: 'current' }, '', window.location.href);
      setIsFirstLoad(false); // 처음 로드 이후로는 상태를 추가하지 않도록 설정
    }
    window.addEventListener('beforeunload', handleUnload); // 페이지 닫기/새로고침
    window.addEventListener('popstate', handlePopstate); // 뒤로가기 감지

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [subscribeList]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
