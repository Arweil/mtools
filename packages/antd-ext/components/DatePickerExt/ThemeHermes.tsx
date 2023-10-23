import React from 'react';
import { ConfigProvider } from 'antd';
import type { GlobalToken } from 'antd';
import { css } from '@emotion/css';
import {
  colorBlackL2,
  colorBlackL4,
  colorError,
  colorGreyL3,
  colorGreyL5,
  colorPrimaryL1,
  colorPrimaryL2,
  colorSuccess,
  colorWarning,
  colorWeakPrimary,
} from '../theme/hermes';

export interface ThemeProps {
  children: React.ReactNode;
}

export const customPopupStyle = (token: GlobalToken, prefixCls: string) => css`
  &.${prefixCls}-picker-dropdown
    .${prefixCls}-picker-year-panel
    .${prefixCls}-picker-cell-inner,
    &.${prefixCls}-picker-dropdown
    .${prefixCls}-picker-quarter-panel
    .${prefixCls}-picker-cell-inner,
    &.${prefixCls}-picker-dropdown
    .${prefixCls}-picker-month-panel
    .${prefixCls}-picker-cell-inner {
    width: 48px;
    height: 48px;
    padding: 0;
    line-height: 48px;
  }

  &.ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-in-range::before {
    background: ${colorWeakPrimary};
  }
`;

export default function ThemeHermesWithDatePicker(props: ThemeProps) {
  return (
    <ConfigProvider
      theme={{
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
      }}
    >
      {props.children}
    </ConfigProvider>
  );
}
