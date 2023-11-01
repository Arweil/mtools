import React from 'react';
import { ConfigProvider } from 'antd';
import type { ThemeProps } from '../utils/useMapTheme';

export function ThemeHermesWithProInputNumber(props: ThemeProps) {
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
          colorTextDisabled: '#BFBFBF',
          colorBgContainerDisabled: '#F1F2F5',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
