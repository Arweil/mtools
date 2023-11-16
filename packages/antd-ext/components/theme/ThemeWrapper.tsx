import { ConfigProvider } from 'antd';
import type { ConfigProviderProps } from 'antd/es/config-provider';
import type { ComponentTokenMap } from 'antd/es/theme/interface';
import React from 'react';

export interface ThemeWrapperProps extends ConfigProviderProps {
  type: keyof ComponentTokenMap;
}

export default function ThemeWrapper(props: ThemeWrapperProps) {
  const { children, theme, type, ...restProps } = props;

  return (
    <ConfigProvider
      theme={{
        token: theme.token,
        components: theme[type],
      }}
      {...restProps}
    >
      {children}
    </ConfigProvider>
  );
}
