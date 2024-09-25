import { ProviderType } from './api/member';

export interface LoginItemProps {
  icon: React.ReactNode;
  provider: ProviderType;
}

export interface LoginListProps {
  loginItemList: LoginItemProps[];
}
