import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../../theme/type';
import { css } from '../../utils/emotion';

const logoBoxHeight = 40;
const triggerHeight = 29;
const headerBg = '#1b2d55';

const styles = (token: GlobalToken, prefixCls: string, tokenExt: Partial<ThemeColor>) => css`
  height: 100vh;

  .${prefixCls}-logoBox {
    display: flex;
    height: ${logoBoxHeight}px;
    background: ${headerBg};
  }

  .${prefixCls}-menuBox {
    height: calc(100vh - ${logoBoxHeight}px - ${triggerHeight}px);
    overflow: auto;

    ::-webkit-scrollbar {
      width: 11px; // 纵向滚动条
      height: 11px; // 横向滚动条
      background-color: transparent;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(50, 50, 50, 0.6);
      background-clip: content-box;
      border: 2px solid transparent;
      border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: rgba(50, 50, 50, 0.8);
    }
    ::-webkit-scrollbar-track:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  .${prefixCls}-layout-sider-has-trigger {
    padding-bottom: ${triggerHeight}px;
  }

  .${prefixCls}-layout-sider {
    background: radial-gradient(circle at 0% 0%, #e5e5ff, rgb(229, 229, 255, 0) 30%),
      radial-gradient(circle at 0% 100%, #dbdeff, #daefff, rgb(218, 239, 255, 0) 60%) #eef4ff;

    &.${prefixCls}-zeus-sider {
      .${prefixCls}-menu-submenu-popup {
        top: ${logoBoxHeight}px !important;
        height: calc(100% - ${logoBoxHeight}px);

        .${prefixCls}-menu {
          max-width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(20px);
        }
      }
    }
  }

  .${prefixCls}-menu-light {
    background: transparent;
  }

  // 收起后的样式
  .${prefixCls}-menu-inline-collapsed {
    .${prefixCls}-menu-item {
      height: 44px !important;
      padding-inline: unset;
    }
    .${prefixCls}-menu-submenu {
      .${prefixCls}-menu-submenu-title {
        height: 44px !important;
        padding-inline: unset !important;
      }
    }

    .${prefixCls}-menu-submenu-selected, .${prefixCls}-menu-item-selected {
      .${prefixCls}-collapsed-menu-item {
        background-color: #fff;
      }
    }
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
          font-size: 14px;
          &::after {
            inset-inline: 24px;
          }
        }
      }
    }
  }

  .${prefixCls}-second-menu {
    user-select: none;

    &.${prefixCls}-menu-inline {
      .${prefixCls}-menu-item {
        margin-block: 0;
      }

      & > li:not(:first-child) {
        margin-top: 4px;
        margin-block-end: 0;
      }

      & > .${prefixCls}-menu-submenu {
        .${prefixCls}-menu-submenu-title {
          margin-block: 0;
        }
      }
    }

    .${prefixCls}-menu-item:not(&.${prefixCls}-menu-item-selected),
    .${prefixCls}-menu-submenu {
      .${prefixCls}-menu-item-icon {
        color: #9aa0a8;
      }
    }

    & > .${prefixCls}-menu-item {
      height: 32px;
      line-height: 32px;
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
          padding-left: 26px !important;
        }
        .${prefixCls}-menu-item-selected {
          font-weight: bold;
        }
        .${prefixCls}-menu-item-active:not(.${prefixCls}-menu-item-selected) {
          color: inherit;
        }
      }
    }

    & > .${prefixCls}-menu-item {
      color: #333333;
      font-weight: bold;

      &.${prefixCls}-menu-item-selected {
        color: #016eff;
        font-weight: bold;
      }
    }
  }
`;

export default styles;
