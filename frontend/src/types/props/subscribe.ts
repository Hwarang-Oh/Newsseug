import { PressBasic } from 'types/api/press';

export interface SubscribeHeaderProps {
  subscribeNumber?: number;
  title: string;
  variant: 'subscribed' | 'all';
}

// 구독 페이지
export interface SubscribePressCardProps {
  press: PressBasic;
  isActive: boolean;
  isAllActive: boolean;
  onClick: () => void;
}

export interface SubscribePressFilterProps {
  subscribeData: PressBasic[];
  activePress: number | null;
  setActivePress: (press: number | null) => void;
}

// 구독 관리(전체 언론사) 페이지
export interface PressCardListProp {
  pressList: PressBasic[];
  subscriptionStatus: { [key: string]: boolean };
  toggleSubscribe: (press: PressBasic) => void;
  isAll: boolean;
}

export interface PressCardProps {
  press: PressBasic;
  isSubscribed: boolean;
  toggleSubscribe: (press: PressBasic) => void;
}
