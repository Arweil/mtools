import type { MenuProps } from 'antd';
import type { CollapseType } from 'antd/es/layout/Sider';
import type React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import type useLayout from './hooks/useLayout';

export type NavigationMode = 'push' | 'open' | 'none';

export type MenuType = ({
  navigationMode?: NavigationMode;
  children?: MenuType;
} & MenuProps['items'][number])[];

export type SelectInfo = Parameters<MenuProps['onSelect']>[number];
export type Tabbar = { key: string; label: string };

export type LayoutV2Type = React.FC<LayoutProps> & {
  useLayout: useLayout;
};

export interface IBaseMenuInfo {
  icon?: React.ReactNode;
  children?: IBaseMenuInfo[];
  url?: string;
  name?: React.ReactNode;
  navigationMode?: NavigationMode;
  [key: string]: any;
}

export interface LayoutProps {
  autoSelectFirstMenuOnNavbar?: boolean;
  children?: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  collapsedWidth?: number;
  hasNavbar?: boolean;
  headerExtra?: React.ReactNode;
  headerContent?: React.ReactNode | false;
  history?: {
    push: (url: string) => void;
    listen: (cb: (location: any, action: string) => void) => () => void;
    [key: string]: any;
  };
  menu?: MenuType;
  onCollapse?: (
    collapsed: boolean,
    info: {
      type: CollapseType;
      siderWidth: number;
      collapsedWidth: number;
    },
  ) => void;
  onSelect?: (info: { key: string }) => void;
  onTabClick?: (key: string | number) => void;
  onTabRemove?: (key: string | number) => void;
  openKeys?: string[];
  selectedKeys?: string[];
  setOpenKeys?: (openKeys: string[]) => void;
  setSelectedKeys?: (selectedKeys: string[]) => void;
  setTitle?: (data: { collapsed: boolean }) => React.ReactNode;
  siderWidth?: number;
  tabActive?: string | number;
  tabs?: {
    code: string | number;
    label: string;
  }[];
  trigger?: (collapsed: boolean) => React.ReactNode;
  needMenuGroup?: boolean; // 对宙斯主题无效
}

export interface LayoutV2Props extends LayoutProps {
  theme?: Theme;
}
