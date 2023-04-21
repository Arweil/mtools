import React, { useMemo } from 'react';
import { ConfigProvider } from 'antd';
import type { ConfigProviderProps } from 'antd/es/config-provider';
import { AntdExtGlobalContext } from './context';
import type { Theme } from './context';
import type { ThemeColor } from '../theme/type';

export interface ConfigProviderExtProps extends ConfigProviderProps {
  children?: React.ReactNode;
  themeExt?: Theme;
  tokenExt?: ThemeColor;
}

export default function ConfigProviderExt(props: ConfigProviderExtProps) {
  const { children, themeExt = 'default', tokenExt, ...restConfigProviderProps } = props;

  return (
    <ConfigProvider {...restConfigProviderProps}>
      <AntdExtGlobalContext.Provider value={{ themeExt, tokenExt }}>
        {children}
      </AntdExtGlobalContext.Provider>
    </ConfigProvider>
  )
}

ConfigProviderExt.config = ConfigProvider.config;
