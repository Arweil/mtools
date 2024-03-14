import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../theme/type';

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => {
  const tmoColor = '#EBF4FF'; // tmp 宙斯主色的8%透明度
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
          margin-right: -7px;  / 4
          z-index: 1;
        }
        .${prefixCls}-tree-iconEle {
          margin-left: -7px; // 组件token titleHeight / 4
        }
      }

      // 不展示连接线、节点占据一行情况下的样式
      &.not-showline.is-blockNode .${prefixCls}-tree-treenode {
        position: relative;

        &:before {
          position: absolute;
          top: 0;
          bottom: 4px; end: 0;
          transition: background-color ${token.motionDurationMid};
          content: '';
          pointer-events: none;
          inset-inline-end: 0;
          inset-inline-start: 0;
        }
        // hover
        &:hover {
          &:before {
            background: ${tmoColor};
            border-radius: ${token.borderRadiusSM}px;
          }
          .${prefixCls}-tree-node-content-wrapper, .${prefixCls}-tree-switcher {
            &:hover {
              background: transparent;
            }
          }
        }
        // selected
        &.${prefixCls}-tree-treenode-selected {
          color: ${tokenExt.colorPrimaryL3};
          &:before {
            background: ${tmoColor};
            border-radius: ${token.borderRadiusSM}px;
          }
          .${prefixCls}-tree-node-selected {
            background: transparent;
          }
        }
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
