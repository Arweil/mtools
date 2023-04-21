import React from 'react';
import { ConfigProvider } from 'antd';
import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';


export interface ThemeProps {
  children: React.ReactNode;
}

export const customStyleWithLayoutExt = (token: GlobalToken, prefixCls: string) => css`
  .${prefixCls}-layout-header {
    background-color: #FFF !important;
    padding-inline: 20px;
    border-top-left-radius: 16px;
  }

  .${prefixCls}-menu-item-group-title {
    padding: 16px 16px 4px;
    height: 40px;
    color: #8F959E;
  }

  .${prefixCls}-menu-inline .${prefixCls}-menu-sub.${prefixCls}-menu-inline>.${prefixCls}-menu-submenu>.${prefixCls}-menu-submenu-title {
    height: 40px;
    line-height: 40px;
    margin: 0;
    width: 100%;
  }
  
  .${prefixCls}-menu-inline, .${prefixCls}-menu-vertical {
    .${prefixCls}-menu-submenu-title, .${prefixCls}-menu-item {
      height: 40px;
      line-height: 40px;
      margin: 0;
      width: 100%;
    }
  }

  .${prefixCls}-menu {
    .${prefixCls}-menu-title-content {
      transition: initial !important;
    }

    .${prefixCls}-menu-item-group .${prefixCls}-menu-item-group-list .${prefixCls}-menu-submenu-title {
      margin: 0;
      height: 40px;
      width: 100%;
    }
  }

  .${prefixCls}-menu-light {
    &.${prefixCls}-menu-root {
      &.${prefixCls}-menu-inline, &.${prefixCls}-menu-vertical {
        border-inline-end: 0;
      }
    }

    &.${prefixCls}-menu-inline .${prefixCls}-menu-sub.${prefixCls}-menu-inline {
      background: initial;
    }

    &:not(.${prefixCls}-menu-horizontal) {
      .${prefixCls}-menu-item:not(.${prefixCls}-menu-item-selected):hover {
        color: #3370FF;
      }

      .ant-menu-submenu-title:hover {
        color: #3370FF;
      }
    }
  }

  .${prefixCls}-layout-sider-trigger {
    height: 48px;
    line-height: 48px;
    text-align: left;
    box-shadow: inset 0px 1px 0px 0px #D0D3D6;
    padding: 0 16px;
  }

  .${prefixCls}-layout-sider-collapsed {
    .${prefixCls}-menu-item-group-title {
      display: none;
    }
  }
`;

export function ThemeHermesWithLayoutExt(props: ThemeProps) {
  const { children } = props;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#F8F9FD',
          colorBgLayout: '#F8F9FD',
          controlItemBgActive: '#F8F9FD',
          colorBgTextHover: '#F1F3FB',
          colorPrimary: '#3370FF',
          controlHeight: 28,
          borderRadius: 4,
          colorText: '#333',
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}