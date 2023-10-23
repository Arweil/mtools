import React from 'react';
import { ConfigProvider } from 'antd';
import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';

export interface ThemeProps {
  children: React.ReactNode;
}

export const customStyleWithInputOutLineExt = (token: GlobalToken, prefixCls: string) => css``;

export function ThemeHermesWithInputOutLineExt(props: ThemeProps) {
  const { children } = props;
  return <ConfigProvider>{children}</ConfigProvider>;
}

export const customStyleWithInputExt = (token: GlobalToken, prefixCls: string) => css`
  &:focus {
    border-color: #2d64e5;
  }
`;

export function ThemeHermesWithInputExt(props: ThemeProps) {
  const { children } = props;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryHover: '#477EFF',
          colorError: '#F74E4F',
          colorErrorBorderHover: '#F74E4F',
          colorWarning: '#F9AD13',
          colorWarningBorderHover: '#F9AD13',
          colorSuccess: '#05BD80',
          colorSuccessBorderHover: '#05BD80',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
