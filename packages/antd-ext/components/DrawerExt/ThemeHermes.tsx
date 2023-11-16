import type React from 'react';
import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import { mtPrefixCls } from '../utils/config';
import type { ThemeColor } from '../theme/type';

export interface ThemeDrawerExtProps {
  children: React.ReactNode;
}

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  .${prefixCls}-${mtPrefixCls}-drawer-close {
    color: ${tokenExt.colorBlackL4};
    font-size: 14px;
  }

  &.${prefixCls}-drawer {
    .${prefixCls}-drawer-mask {
      background: rgba(0, 0, 0, 0.06);
    }

    .${prefixCls}-drawer-header {
      padding: 20px;
    }

    .${prefixCls}-drawer-title {
      color: ${tokenExt.colorBlackL1};
      font-weight: 500;
    }

    .${prefixCls}-drawer-body {
      padding: 20px;
    }

    .${prefixCls}-drawer-footer {
      padding: 16px 20px;
    }
  }
`;
