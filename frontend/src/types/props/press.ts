export interface PressDescriptionProps {
  description: string;
}

export interface PressInfoProps {
  id: number;
  name: string;
  imageUrl: string;
  subscribeCount: number;
  isSubscribed: boolean;
}

export interface PressArticleProps {
  pressId: number;
  activeCategory: string;
}
