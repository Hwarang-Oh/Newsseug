export interface PressBasic {
  id: number;
  name: string;
  imageUrl: string;
  isSubscribed: boolean;
}

export interface PressDetail extends PressBasic {
  description: string;
  subscribeCount: number;
}
