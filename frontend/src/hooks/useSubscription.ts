import { RootState } from '../redux/index';
import { useState, useEffect, useRef } from 'react';
import { PressBasic } from 'types/api/press';
import { useDispatch, useSelector } from 'react-redux';

import {
  addPress,
  fetchSubscribedPress,
  removePress,
  updateSubscribedPress,
} from '../redux/subscribeSlice';

import {
  getAllPressList,
  subscribePress,
  unsubscribePress,
} from 'apis/subscribe';

function useSubscription() {
  const dispatch = useDispatch();
  const subscribeListRef = useRef<PressBasic[]>([]);
  const [allPressList, setAllPressList] = useState<PressBasic[]>([]);
  const [subscribeList, setSubscribeList] = useState<PressBasic[]>([]);
  const { subscribedPress } = useSelector(
    (state: RootState): { subscribedPress: PressBasic[] } =>
      state.subscribedPress,
  );
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        if (subscribedPress.length === 0) dispatch(fetchSubscribedPress());
        const allPressData = await getAllPressList();
        setAllPressList(allPressData);
        setSubscribeList(subscribedPress);
      } catch (error) {
        console.error('Failed to fetch press data');
      }
    };
    fetchSubscription();
  }, []);

  useEffect(() => {
    subscribeListRef.current = subscribeList;
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

  const toggleSubscribe = (press: PressBasic) => {
    const isSubscribed = subscriptionStatus[press.id];
    setSubscriptionStatus((prev) => ({
      ...prev,
      [press.id]: !isSubscribed,
    }));
    if (isSubscribed) {
      setSubscribeList(subscribeList.filter((p) => p.id !== press.id));
      dispatch(removePress(press.id));
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
      dispatch(addPress(press));
    }
  };

  const handleSubscriptionUpdate = () => {
    const targetList = subscribeListRef.current;
    const newSubscribe = targetList.filter(
      (press) => !subscribedPress.some((subPress) => subPress.id === press.id),
    );
    const removeSubscribe = subscribedPress.filter(
      (subPress) => !targetList.some((press) => press.id === subPress.id),
    );
    newSubscribe.forEach(async (press) => {
      await subscribePress(press.id);
    });
    removeSubscribe.forEach(async (press) => {
      await unsubscribePress(press.id);
    });
    console.log(targetList);
    dispatch(updateSubscribedPress(targetList));
  };

  return {
    allPressList,
    subscribeList,
    subscriptionStatus,
    toggleSubscribe,
    handleSubscriptionUpdate,
  };
}

export default useSubscription;
