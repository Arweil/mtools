import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../theme/type';
import { css } from '../utils/emotion';

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => {
  return css`
    .${prefixCls}-tree {
      color: ${tokenExt.colorBlackL1};

      // 基本布局
      .${prefixCls}-tree-node-content-wrapper {
        display: flex;
        flex: 1;
        .${prefixCls}-tree-title {
          flex: 1;
        }
      }
      // 展开箭头和节点的间距
      &.not-showline .${prefixCls}-tree-treenode {
        .${prefixCls}-tree-switcher {
          z-index: 1;
          z-index: 1;
          margin-right: -7px;
        }
        .${prefixCls}-tree-iconEle {
          margin-left: -7px; // 组件token titleHeight / 4
        }
      }

      // 不展示连接线、节点占据一行情况下的样式
      &.not-showline.is-blockNode .${prefixCls}-tree-treenode {
        position: relative;

        &.${prefixCls}-tree-treenode-selected {
          background-color: ${tokenExt.colorWeakPrimary};
          border-radius: ${token.borderRadiusSM}px;
        }

        & > .${prefixCls}-tree-node-content-wrapper {
          &.${prefixCls}-tree-node-selected {
            color: ${tokenExt.colorPrimaryL3};
            background-color: transparent;
          }

          &:hover {
            background-color: transparent;
          }
        }

        &:hover {
          background-color: ${tokenExt.colorWeakPrimary};
          border-radius: ${token.borderRadiusSM}px;
        }

        & > .${prefixCls}-tree-switcher:hover::before {
          background-color: transparent;
        }
      }
    }

    // more按钮
    .${prefixCls}-more-btn {
      display: none;
    }
    .${prefixCls}-tree-treenode {
      &:hover .${prefixCls}-more-btn {
        display: block;
      }
    }

    // more的下拉菜单项
    .${prefixCls}-dropdown {
      .${prefixCls}-dropdown-menu {
        padding-right: 8px;
        padding-left: 8px;
        .${prefixCls}-dropdown-menu-item {
          min-width: 70px;
          text-align: center;
        }
      }
    }
  `;
};
