export interface SubscribeHeaderProps {
  subscribeNumber?: number;
  title: string;
  variant: 'subscribed' | 'all';
}

export interface PressInfo {
  id: number;
  name: string;
  imgUrl: string;
}

export interface AllPressInfo extends PressInfo {
  isSubscribed: boolean;
}

// 구독 페이지
export interface SubscribePressCardProps {
  press: PressInfo;
  isActive: boolean;
  isAllActive: boolean;
  onClick: () => void;
}

export interface SubscribePressFilterProps {
  subscribeData: PressInfo[];
  activePress: number | null;
  setActivePress: (press: number | null) => void;
}

// 구독 관리(전체 언론사) 페이지
export interface PressCardListProp {
  pressList: PressInfo[];
  subscriptionStatus: { [key: string]: boolean };
  toggleSubscribe: (press: PressInfo) => void;
  isAll: boolean;
}

export interface PressCardProps {
  press: PressInfo;
  isSubscribed: boolean;
  toggleSubscribe: (press: PressInfo) => void;
}
