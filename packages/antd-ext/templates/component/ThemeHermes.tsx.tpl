import React from 'react';
import { ConfigProvider } from 'antd';
import type { GlobalToken } from 'antd';
import { css } from '@emotion/css';
import {
  colorPrimaryL1,
  colorPrimaryL2,
  colorPrimaryL3,
  colorSuccess,
  colorWarning,
  colorError,
  colorWeakSuccess,
  colorWeakWarning,
  colorWeakError,
  colorWeakPrimary,
  colorBlackL1,
  colorBlackL2,
  colorBlackL3,
  colorBlackL4,
  colorGreyL1,
  colorGreyL2,
  colorGreyL3,
  colorGreyL4,
  colorGreyL5,
  colorGreyL6,
  colorGreyL7,
} from '../theme/hermes';

export interface ThemeProps {
  children: React.ReactNode;
}

export const customStyle = (token: GlobalToken, prefixCls: string) => css``;

export default function ThemeHermesWith{{{compName}}}(props: ThemeProps) {
  return (
    <ConfigProvider
      theme={ {
        token: {
          colorPrimary: colorPrimaryL1,
          controlItemBgHover: colorGreyL3,
          colorBgContainerDisabled: colorGreyL5,
          colorTextDisabled: colorBlackL4,
          colorPrimaryHover: colorPrimaryL2,
          colorText: colorBlackL2,
          colorError: colorError,
          colorErrorBorderHover: colorError,
          colorWarning: colorWarning,
          colorWarningBorderHover: colorWarning,
          colorSuccess: colorSuccess,
          colorSuccessBorderHover: colorSuccess,
        },
      }  }
    >
      {props.children}
    </ConfigProvider>
  );
}
