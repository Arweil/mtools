import type React from 'react';
import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import { colorBlackL3, colorGreyL1, colorGreyL7, colorPrimaryL1 } from '../theme/hermes';

export interface ThemeProps {
  children: React.ReactNode;
}

export const customStyleWithLayoutExt = (token: GlobalToken, prefixCls: string) => css`
  &.${prefixCls}-layout {
    .${prefixCls}-layout-sider-light {
      background: ${colorGreyL7};

      .${prefixCls}-layout-sider-trigger {
        background: ${colorGreyL7};
      }
    }
  }

  .${prefixCls}-layout-header {
    background-color: #fff !important;
    border-top-left-radius: 16px;
    padding-inline: 20px;
  }

  .${prefixCls}-menu-item-group-title {
    height: 40px;
    padding: 16px 16px 4px;
    color: ${colorBlackL3};
    font-size: 12px;
  }

  .${prefixCls}-menu-inline
    .${prefixCls}-menu-sub.${prefixCls}-menu-inline>.${prefixCls}-menu-submenu>.${prefixCls}-menu-submenu-title {
    width: 100%;
    height: 40px;
    margin: 0;
    line-height: 40px;
  }

  .${prefixCls}-menu-inline, .${prefixCls}-menu-vertical {
    .${prefixCls}-menu-submenu-title, .${prefixCls}-menu-item {
      width: 100%;
      height: 40px;
      margin: 0;
      line-height: 40px;
    }
  }

  .${prefixCls}-menu {
    .${prefixCls}-menu-title-content {
      transition: initial !important;
    }

    .${prefixCls}-menu-item-group
      .${prefixCls}-menu-item-group-list
      .${prefixCls}-menu-submenu-title {
      width: 100%;
      height: 40px;
      margin: 0;
    }

    .${prefixCls}-menu-item {
      border-radius: 0;
    }
  }

  .${prefixCls}-menu-light {
    color: #333333;
    background: ${colorGreyL7};
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
        color: ${colorPrimaryL1};
        background-color: #f1f3fb;
      }

      .${prefixCls}-menu-submenu-title:hover {
        color: ${colorPrimaryL1};
      }
    }

    .${prefixCls}-menu-item-selected {
      background-color: transparent;
    }
  }

  .${prefixCls}-layout-sider-trigger {
    height: 48px;
    padding: 0 16px;
    line-height: 48px;
    text-align: left;
    box-shadow: inset 0px 1px 0px 0px ${colorGreyL1};
  }

  .${prefixCls}-layout-sider-collapsed {
    .${prefixCls}-menu-item-group-title {
      display: none;
    }
  }
`;
