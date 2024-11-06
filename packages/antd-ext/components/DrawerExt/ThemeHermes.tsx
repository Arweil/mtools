import type { GlobalToken } from 'antd';
import type React from 'react';
import type { ThemeColor } from '../theme/type';
import { mtPrefixCls } from '../utils/config';
import { css } from '../utils/emotion';

export interface ThemeDrawerExtProps {
  children: React.ReactNode;
}

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  .${prefixCls}-${mtPrefixCls}-drawer-close {
    padding-left: 8px;
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
      font-weight: 600;
    }

    .${prefixCls}-drawer-body {
      padding: 20px;
    }

    .${prefixCls}-drawer-footer {
      padding: 16px 20px;
    }
  }
`;
