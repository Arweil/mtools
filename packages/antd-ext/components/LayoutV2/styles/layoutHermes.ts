import type { GlobalToken } from 'antd';
import type React from 'react';
import type { ThemeColor } from '../../theme/type';
import { css } from '../../utils/emotion';

export interface ThemeProps {
  children: React.ReactNode;
}

export const tabItemStyle = css`
  height: 32px;
  min-width: 100px;
  line-height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #646a73;
  border-radius: 20px;
  font-size: 14px;
  &:hover {
    color: #3370ff;
    background: #eff4ff;

    span:first-child {
      margin-left: 6px;
    }

    span:last-child {
      display: inline-flex;
    }
  }
`;

export const tabItemActiveStyle = css`
  background: #eff4ff;
  color: #3370ff;
  span:first-child {
    margin-left: 6px;
  }
  span:last-child {
    display: inline-flex;
  }
`;

export const tabStyle = (token: GlobalToken, prefixCls: string, mtPrefixCls: string) => css`
  &.${prefixCls}-${mtPrefixCls}-tabs {
    display: flex;
    flex: 1;
    gap: 4px;
    align-items: center;
    padding: 8px 0;
    overflow: auto;
  }
`;

export const headerExtraStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const styles = (token: GlobalToken, prefixCls: string, tokenExt: Partial<ThemeColor>) => css`
  &.${prefixCls}-layout {
    .${prefixCls}-layout-sider-light {
      background: ${tokenExt.colorGreyL7};

      .${prefixCls}-layout-sider-trigger {
        background: ${tokenExt.colorGreyL7};
      }
    }
  }

  .${prefixCls}-layout-header {
    background-color: ${tokenExt.colorWhite} !important;
    border-top-left-radius: 16px;
    padding-inline: 20px;
  }

  .${prefixCls}-menu-item-group-title {
    height: 40px;
    padding: 16px 16px 4px;
    color: ${tokenExt.colorBlackL3};
    font-size: 12px;
  }

  .${prefixCls}-menu-title-content {
    transition: initial !important;
  }

  :not(.${prefixCls}-menu-inline-collapsed) {
    .${prefixCls}-menu-inline
      .${prefixCls}-menu-submenu-title,
      .${prefixCls}-menu-inline
      .${prefixCls}-menu-item {
      height: 40px;
      line-height: 40px;
      margin-inline: 0;
    }
  }

  .${prefixCls}-menu-item {
    border-radius: 0;
  }

  .${prefixCls}-menu-light {
    color: ${tokenExt.colorBlackL1};
    background: ${tokenExt.colorGreyL7};
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
        color: ${tokenExt.colorPrimaryL1};
        background-color: ${tokenExt.colorGreyL4};
      }

      .${prefixCls}-menu-submenu-title:hover {
        color: ${tokenExt.colorPrimaryL1};
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
    box-shadow: inset 0px 1px 0px 0px ${tokenExt.colorGreyL1};
  }

  .${prefixCls}-menu-item-group
    .${prefixCls}-menu-item-group-list
    .${prefixCls}-menu-submenu-title {
    padding-inline: 28px 30px;
  }

  .${prefixCls}-layout-sider-collapsed {
    .${prefixCls}-menu-item-group-title {
      display: none;
    }
  }
`;

export default styles;
