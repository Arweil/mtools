import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../../theme/type';

const logoBoxHeight = 40;
const triggerHeight = 29;
const headerBg = '#1b2d55';

const styles = (token: GlobalToken, prefixCls: string, tokenExt: Partial<ThemeColor>) => css`
  height: 100vh;

  .logoBox {
    display: flex;
    height: ${logoBoxHeight}px;
    background: ${headerBg};
  }

  .menuBox {
    height: calc(100vh - ${logoBoxHeight}px - ${triggerHeight}px);
    overflow: auto;
  }

  .${prefixCls}-layout-sider-has-trigger {
    padding-bottom: ${triggerHeight}px;
  }

  .${prefixCls}-layout-sider {
    background: radial-gradient(circle at 0% 0%, #e5e5ff, rgb(229, 229, 255, 0) 30%),
      radial-gradient(circle at 0% 100%, #dbdeff, #daefff, rgb(218, 239, 255, 0) 60%) #eef4ff;
  }

  .${prefixCls}-menu-light {
    background: transparent;
  }

  .${prefixCls}-layout-sider-trigger {
    position: absolute;
    height: 29px;
    color: #666666;
    line-height: 29px;
    background: transparent;
  }

  .${prefixCls}-layout-header {
    height: ${logoBoxHeight}px;
    padding: 0;
    line-height: 40px;
    background: ${headerBg};
    user-select: none;

    .${prefixCls}-menu-light {
      &.${prefixCls}-menu-horizontal {
        > .${prefixCls}-menu-item-active {
          &:not(.${prefixCls}-menu-item-selected) {
            &::after {
              display: none;
              transition: none;
            }
          }
        }

        > .${prefixCls}-menu-item {
          &::after {
            inset-inline: 24px;
          }
        }
      }
    }
  }

  .${prefixCls}-second-menu {
    user-select: none;

    & > .${prefixCls}-menu-item {
      height: 32px;
      &:not(:first-child) {
        margin-top: 4px;
      }
    }

    & > .${prefixCls}-menu-submenu {
      &:not(:first-child) {
        margin-top: 4px;
      }

      .${prefixCls}-menu-submenu-title {
        height: 32px;
        color: #333333;
        font-weight: bold;
        line-height: 32px;
        padding-inline-end: 27px;

        .${prefixCls}-menu-item-icon {
          margin-inline-end: 4px;
        }

        .${prefixCls}-menu-title-content {
          margin-inline-start: 0px;
        }

        .${prefixCls}-menu-submenu-arrow {
          inset-inline-end: 9px;
        }
      }

      .${prefixCls}-menu-sub {
        .${prefixCls}-menu-item {
          height: 28px;
          padding-left: 22px !important;
        }
        .${prefixCls}-menu-item-selected {
          font-weight: bold;
        }
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

export default styles;
