import { Press } from '../api/press';

export interface SubscribeHeaderProps {
  subscribeNumber?: number;
  title: string;
  variant: 'subscribed' | 'all';
}

// 구독 페이지
export interface SubscribePressCardProps {
  press: Press;
  isActive: boolean;
  isAllActive: boolean;
  onClick: () => void;
}

export interface SubscribePressFilterProps {
  subscribeData: Press[];
  activePress: number | null;
  setActivePress: (press: number | null) => void;
}

// 구독 관리(전체 언론사) 페이지
export interface PressCardListProp {
  pressList: Press[];
  subscriptionStatus: { [key: string]: boolean };
  toggleSubscribe: (press: Press) => void;
  isAll: boolean;
}

export interface PressCardProps {
  press: Press;
  isSubscribed: boolean;
  toggleSubscribe: (press: Press) => void;
}
