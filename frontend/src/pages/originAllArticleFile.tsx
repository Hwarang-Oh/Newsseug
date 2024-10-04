import { useEffect, useState } from 'react';
import { RootState } from '../redux/index';
import { useDispatch, useSelector } from 'react-redux';
import SubscribeHeader from 'components/subscribe/SubscribeHeader';
import SubLayout from 'components/common/SubLayout';
import PressCardList from 'components/subscribe/PressCardList';

import {
  getAllPressList,
  subscribePress,
  unsubscribePress,
} from 'apis/subscribe';
import { PressBasic } from 'types/api/press';
import {
  fetchSubscribedPress,
  updateSubscribedPress,
} from '../redux/subscribeSlice';

function AllSubscribes() {
  /**
   * IMP : 구독/전체 언론사 List 상태 관리
   */
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [allPressList, setAllPressList] = useState<PressBasic[]>([]);
  const [subscribeList, setSubscribeList] = useState<PressBasic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // IMP : 전역에서 관리하는 구독 언론사 List -> 현재 Page에서 초기 상태를 의미함.
  const { subscribedPress } = useSelector(
    (state: RootState) => state.subscribedPress,
  );
  // IMP : 전체 언론사에 대해 구독 여부를 저장하는 ID : isSubscribed 쌍의 객체 상태
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    [key: string]: boolean;
  }>({});

  /**
   * IMP : UseEffect() => 구독/전체 언론사를 Redux Store & API 호출을 통해 가져온다.
   * * 사용자가 직접적으로 '전체 구독 보기' Page에 올 일이 없을 것으로 생각되어, 굳이 Caching하지 않음
   * TODO : 이 useEffect가 dispatch와 subscribedPress를 반드시 의존해야 하는가?
   */
  useEffect(() => {
    const fetchSubscribed = async () => {
      try {
        if (subscribedPress.length === 0) dispatch(fetchSubscribedPress());
        const allPressData = await getAllPressList();
        setAllPressList(allPressData);
        setSubscribeList(subscribedPress);
      } catch (error) {
        setError('Failed to fetch press data');
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribed();
  }, [dispatch, subscribedPress]);

  /**
   * IMP : 선택한 언론사의 구독 상태를 변경하는 함수
   * IMP : 구독 상태를 변경하면서, 구독 리스트를 업데이트 한다 => useEffect()를 Trigger함.
   * @param press
   */
  const toggleSubscribe = (press: PressBasic) => {
    const isSubscribed = subscriptionStatus[press.id];
    setSubscriptionStatus((prev) => ({
      ...prev,
      [press.id]: !prev[press.id],
    }));

    if (isSubscribed) {
      setSubscribeList((prev) => prev.filter((p) => p.id !== press.id));
    } else {
      setSubscribeList((prev) => [
        ...prev,
        {
          id: press.id,
          name: press.name,
          imageUrl: press.imageUrl,
          isSubscribed: true,
        },
      ]);
    }
  };

  /**
   * IMP : UseEffect() => allPressList에서 subscribeList에 있는 언론사를 찾아 구독 Status를 초기화한다
   * TODO : subscribeList가 Toggle에 의해 바뀌면서, 구독 Status를 변경해야 함 => UseEffect() 의존성이 적합함
   */
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

  /**
   * IMP : AllSubscribes 페이지를 벗어날 때, 구독 상태를 Update하는 함수
   * IMP : 실제 구독 상태를 변경하는 API 호출은 이때 발생한다
   * * subscribeList : 현재 Page에서 관리하고 있는 구독한 언론사 상태
   * * subscribedPress : 초기에 전역적으로 관리하는 Store에서 받아왔던 구독 언론사
   * TODO : 두 개의 List를 비교해서, 차이가 나는 항목에 대하여 언론사 구독/취소 API를 호출해야 한다
   * TODO : 따로 submit에 대한 Button이 없기 때문에, 사용자의 Page 이탈을 감지하여 이 함수를 호출해야 한다.
   */
  const handleSubscribeState = async () => {
    const newSubscribe = subscribeList.filter(
      (press) =>
        !subscribedPress.some(
          (subPress: PressBasic) => subPress.id === press.id,
        ),
    );

    const removeSubscribe: PressBasic[] = subscribedPress.filter(
      (press: PressBasic) =>
        !subscribeList.some((subPress) => subPress.id === press.id),
    );

    await Promise.all(newSubscribe.map((press) => subscribePress(press.id)));
    await Promise.all(
      removeSubscribe.map((press) => unsubscribePress(press.id)),
    );
    dispatch(updateSubscribedPress(subscribeList));
  };

  /**
   * IMP : AllSubscribes 페이지를 벗어나는 것을 감지하는 UseEffect()
   * TODO : Page를 벗어날 때, Update를 진행하므로 subscribeList의 변화를 의존성 배열에 추가한다.
   */
  useEffect(() => {
    const handleUnload = (event: BeforeUnloadEvent) => {
      handleSubscribeState();
    };

    const handlePopstate = (event: PopStateEvent) => {
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
      console.log(subscribeList);
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [subscribeList]);

  return (
    <SubLayout>
      <div>내 구독목록</div>
      <div>
        <button onClick={() => console.log(subscribeList)}></button>
        <button onClick={() => console.log(subscribedPress)}></button>
        <button onClick={() => console.log(subscriptionStatus)}></button>
        <button onClick={() => handleSubscribeState()}>눌러봐</button>
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
