import React from 'react';
import { ConfigProvider } from 'antd';
import { css } from '@emotion/css';
import {
  colorPrimaryL2,
  colorError,
  colorWarning,
  colorSuccess,
  colorGreyL4,
} from '../theme/hermes';
import type { GlobalToken } from 'antd';

export interface ThemeSelectExtProps {
  children: React.ReactNode;
}

export const customStyleWithPopup = (token: GlobalToken, prefixCls: string) => css`
  .${prefixCls}-select-item {
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`;

export const customStyleWithSelectExt = (token: GlobalToken, prefixCls: string) => css`
`;

export function ThemeHermes(props: ThemeSelectExtProps) {
  const { children } = props;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryHover: colorPrimaryL2,
          colorError: colorError,
          colorErrorBorderHover: colorError,
          colorWarning: colorWarning,
          colorWarningBorderHover: colorWarning,
          colorSuccess: colorSuccess,
          colorSuccessBorderHover: colorSuccess,
          controlItemBgHover: colorGreyL4,
          controlItemBgActive: colorGreyL4,
          borderRadiusLG: 4,
          borderRadiusSM: 2,
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}