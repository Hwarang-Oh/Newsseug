export type LayoutProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  isPaddingZero?: boolean;
};

export type SubLayoutProps = {
  children: React.ReactNode;
  isSearch?: boolean;
  headerColor?: string;
  isPaddingZero?: boolean;
};

export interface LogoHeaderProps {
  size?: number;
}

export type VectorWordProps = {
  icon: React.ReactNode;
  color?: string;
};

export type NavItemProps = {
  icon: React.ReactNode;
  text?: string;
  isMain?: boolean;
  active: boolean;
  onClick: () => void;
};
