import { ConfigProvider } from 'antd';
import type { ConfigProviderProps } from 'antd/es/config-provider';
import React, { useMemo } from 'react';
import GlobalStyle from '../GlobalStyle';
import * as hermesDefaultColor from '../theme/hermes';
import type { ThemeColor } from '../theme/type';
import type { Theme } from './context';
import { AntdExtGlobalContext } from './context';

export interface ConfigProviderExtProps extends ConfigProviderProps {
  children?: React.ReactNode;
  themeExt?: Theme;
  tokenExt?: ThemeColor;
}

export default function ConfigProviderExt(props: ConfigProviderExtProps) {
  const { children, themeExt = 'hermes', tokenExt, ...restConfigProviderProps } = props;

  // 合并后的token
  const mergedTokenExt = useMemo(() => {
    return {
      hermes: { ...hermesDefaultColor, ...(tokenExt || {}) } as ThemeColor,
      zeus: tokenExt as ThemeColor,
      default: tokenExt as ThemeColor,
    }[themeExt];
  }, [themeExt, tokenExt]);

  return (
    <ConfigProvider {...restConfigProviderProps}>
      <AntdExtGlobalContext.Provider value={{ themeExt, mergedTokenExt }}>
        <GlobalStyle />
        {children}
      </AntdExtGlobalContext.Provider>
    </ConfigProvider>
  );
}

ConfigProviderExt.config = ConfigProvider.config;

ConfigProviderExt.useConfig = ConfigProvider.useConfig;
