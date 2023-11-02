import React from 'react';
import { ConfigProvider } from 'antd';
import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import {
  colorPrimaryL2,
  colorError,
  colorWarning,
  colorSuccess,
  colorGreyL1,
} from '../theme/hermes';

export interface ThemeRangeNumberExtProps {
  children: React.ReactNode;
}

export const customStyleWithRangeNumberExt = (token: GlobalToken, prefixCls: string) => css``;

export function ThemeHermesWithRangeNumberExt(props: ThemeRangeNumberExtProps) {
  const { children } = props;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorder: colorGreyL1,
          colorPrimaryHover: colorPrimaryL2,
          colorError: colorError,
          colorErrorBorderHover: colorError,
          colorWarning: colorWarning,
          colorWarningBorderHover: colorWarning,
          colorSuccess: colorSuccess,
          colorSuccessBorderHover: colorSuccess,
          colorTextDisabled: '#BFBFBF',
          colorBgContainerDisabled: '#F1F2F5',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export interface ThemeHermesWithRangeNumberOutLineExtProps {
  children: React.ReactNode;
}

export const customStyleWithRangeNumberOutLineExt = (token: GlobalToken, prefixCls: string) =>
  css``;

export function ThemeHermesWithRangeNumberOutLineExt(
  props: ThemeHermesWithRangeNumberOutLineExtProps,
) {
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
          colorTextDisabled: '#BFBFBF',
          colorBgContainerDisabled: '#F1F2F5',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
