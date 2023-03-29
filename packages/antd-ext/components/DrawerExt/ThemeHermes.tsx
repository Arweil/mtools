import React from 'react';
import { ConfigProvider } from 'antd';
import { css } from '@emotion/css';
import { colorBlackL1, colorBlackL4 } from '../theme/hermes';
import type { GlobalToken } from 'antd';

export interface ThemeDrawerExtProps {
  children: React.ReactNode;
}

export const customStyle = (token: GlobalToken, prefixCls: string) => css`
  .${prefixCls}-mt-drawer-close {
    font-size: 14px;
    color: ${colorBlackL4};
  }
`;

export function ThemeHermesWithDrawerExt(props: ThemeDrawerExtProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          paddingXS: 23,
          padding: 20,
          paddingLG: 20,
          colorText: colorBlackL1,
          colorBgMask: 'rgba(0, 0, 0, 0.06)'
        }
      }}
    >
      {props.children}
    </ConfigProvider>
  )
}
