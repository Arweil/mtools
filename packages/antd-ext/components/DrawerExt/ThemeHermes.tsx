import type React from 'react';
import { ConfigProvider } from 'antd';
import { css } from '@emotion/css';
import { colorBlackL1, colorBlackL4 } from '../theme/hermes';
import type { GlobalToken } from 'antd';
import { mtPrefixCls } from '../utils/config';

export interface ThemeDrawerExtProps {
  children: React.ReactNode;
}

export const customStyle = (token: GlobalToken, prefixCls: string) => css`
  .${prefixCls}-${mtPrefixCls}-drawer-close {
    color: ${colorBlackL4};
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
      color: ${colorBlackL1};
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
