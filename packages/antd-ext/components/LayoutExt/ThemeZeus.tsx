import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../theme/type';
import { mtPrefixCls } from '../utils/config';

export const customStyleWithLayoutExt = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  .${prefixCls}-layout-sider-has-trigger {
    padding-bottom: 29px;
  }

  .${prefixCls}-layout-header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding: 0;
    line-height: 40px;
    background: #1b2d55;
  }

  .${prefixCls}-layout-sider {
    background: radial-gradient(circle at 0% 0%, #e5e5ff, rgb(229, 229, 255, 0) 30%),
      radial-gradient(circle at 0% 100%, #dbdeff, #daefff, rgb(218, 239, 255, 0) 60%) #eef4ff;
  }

  .${prefixCls}-menu-light {
    background: transparent;
  }

  .${prefixCls}-layout-sider-trigger {
    height: 29px;
    color: #666666;
    line-height: 29px;
    background: transparent;
  }

  .${prefixCls}-${mtPrefixCls}-menu-header {
    &.${prefixCls}-menu-light {
      &.${prefixCls}-menu-horizontal {
        > .${prefixCls}-menu-item-selected {
          margin-bottom: 6px;
          color: #ffffff;
          &::after {
            display: block !important;
            border-bottom-color: #ffffff;
            inset-inline: 24px;
          }
        }

        > .${prefixCls}-menu-item-active {
          &::after {
            display: none;
          }
        }

        > .${prefixCls}-menu-item {
          &::after {
            transition: initial;
          }
        }
      }
    }
  }

  .${prefixCls}-${mtPrefixCls}-menu {
    margin-top: 8px;
    & > .${prefixCls}-menu-submenu {
      color: #333333;
      font-weight: 500;

      &-selected {
        .${prefixCls}-menu-item-selected {
          font-weight: bold;
        }
      }
      > .${prefixCls}-menu {
        color: #666666;
        font-weight: 400;
      }
    }

    & > .${prefixCls}-menu-item {
      color: #333333;
      font-weight: 500;

      &.${prefixCls}-menu-item-selected {
        color: #016eff;
        font-weight: bold;
      }
    }
  }
`;
