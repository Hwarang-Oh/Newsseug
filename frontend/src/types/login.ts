export interface LoginItemProps {
  icon: React.ReactNode;
  provider: string;
}

export interface LoginListProps {
  loginItemList: LoginItemProps[];
}
