import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../theme/type';
import { css } from '../utils/emotion';

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  &.${prefixCls}-card-list {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .${prefixCls}-card-list-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
    }

    .${prefixCls}-card-list-content {
      width: 100%;
      min-width: 0;
      height: 100%;
      overflow-y: auto;
      transition: all 0.3s ease;
      &.selected {
        flex-shrink: 0;
      }
      &::webkit-scrollbar {
        width: 1px;
      }
    }

    .${prefixCls}-card-list-detail {
      min-width: 0;
      padding: 16px;
      overflow: hidden;
      background: #ffffff;
      border-left: 1px solid #d9d9d9;
      transform: translateX(50px);
      transition: all 0.3s ease;

      &.visible {
        transform: translateX(0);
      }
    }

    .${prefixCls}-card-list-item {
      transition: all 0.3s ease;

      &.selected {
        background: linear-gradient(180deg, #eef5ff 0%, #ffffff 100%);
        border: 1px solid #3370ff;
        border-radius: 8px;
        box-shadow: 0px 1px 7px 0px rgba(51, 112, 255, 0.3);
        cursor: pointer;
      }
    }

    .${prefixCls}-card-list-pagination {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      margin-top: ${token.marginMD}px;
      transition: all 0.3s ease;

      &.selected {
        width: 25%;
      }
    }
  }
`;
