export interface Press {
  id: number;
  name: string;
  imageUrl: string;
  isSubscribed: boolean;
}

export interface PressDetail extends Press {
  description: string;
  subscribeCount: number;
}
