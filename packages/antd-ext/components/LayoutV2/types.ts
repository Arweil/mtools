import type { MenuProps } from 'antd';
import type React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import type useLayout from './hooks/useLayout';

export type MenuType = MenuProps['items'];
export type SelectInfo = Parameters<MenuProps['onSelect']>[number];
export type Tabbar = { key: string; label: string };

export type LayoutV2Type = React.FC<LayoutProps> & {
  useLayout: useLayout;
};

export interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  collapsedWidth?: string | number;
  defaultActiveMenu?: string;
  extra?: React.ReactNode;
  logo?: (collapsed: boolean) => React.ReactNode;
  menu?: MenuType;
  onSelect?: (info: { key: string }) => void;
  siderWidth?: string | number;
  trigger?: (collapsed: boolean) => React.ReactNode;
}

export interface LayoutV2Props extends LayoutProps {
  theme?: Theme;
}
