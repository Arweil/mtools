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

// export const customStyleWithSelectExt = (token: GlobalToken, prefixCls: string) => css``;

// TODO: 设置 margin 导致虚拟列表无法完全展示选项，目前未解决
// export const customStyleWithPopup = (token: GlobalToken, prefixCls: string) => css`
//   .${prefixCls}-select-item {
//     display: flex;
//     align-items: center;
//     .${prefixCls}-select-item-option-content {
//       flex: 1;
//     }
//     &::before {
//       content: ' ';
//       width: 16px;
//       height: 16px;
//       background: red;
//       margin-inline-end: 8px;
//     }
//   }
// `;

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
          colorFillSecondary: colorGreyL4,
          colorSplit: colorGreyL4,
          colorTextDisabled: '#BFBFBF',
          colorBgContainerDisabled: '#F1F2F5',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
