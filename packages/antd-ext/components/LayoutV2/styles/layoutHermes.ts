import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../../theme/type';
import { mtPrefixCls } from '../../utils/config';
import { css } from '../../utils/emotion';

export const headerExtraStyle = (prefixCls: string) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .${prefixCls}-${mtPrefixCls}-header-extra-wrap {
    z-index: 1;
    flex-shrink: 0;
    height: 100%;

    &.canScroll {
      box-shadow: -2px 0px 4px -1px rgba(146, 149, 163, 0.18);
    }
  }
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
    height: auto;
    min-height: 56px;
    line-height: unset;
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

// --------------------------tabbar style--------------------------

const wrap = css`
  position: relative;
  width: 100%;
  padding: 14px 0 10px;
  border-radius: 16px 0px 0px 0px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  white-space: nowrap;
`;

const leftBtn = css`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 28px;
  padding-left: 7px;
  z-index: 1;
  cursor: pointer;
`;

const rightBtn = css`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 28px;
  padding-right: 7px;
  z-index: 1;
  text-align: right;
  cursor: pointer;
`;

const list = css`
  gap: 4px;
`;

const tab = css`
  position: relative;
  padding: 6px 22px;
  line-height: normal;
  cursor: pointer;
  user-select: none;
  border-radius: 20px;
  font-size: 14px;
`;

const selected = css`
  position: relative;
  background: #eff4ff;
  font-weight: bold;
  color: #3370ff;
  line-height: 20px;
  border-radius: 20px;
  z-index: 1;

  .close {
    display: block;
  }

  .tab {
    padding: 6px 13px 6px 15px;
  }
`;

const tabWrap = css`
  color: #646a73;
  border-radius: 20px;

  :hover {
    ${selected};
    z-index: 0;
    color: #646a73;
    font-weight: unset;
    background: #f2f3f5;
  }

  .close {
    display: none;
  }
`;

const close = css`
  margin-left: 7px;
  font-size: 9px;
`;

const tabbarStyle = {
  wrap,
  leftBtn,
  rightBtn,
  list,
  tab,
  tabWrap,
  selected,
  close,
};

export { tabbarStyle };
