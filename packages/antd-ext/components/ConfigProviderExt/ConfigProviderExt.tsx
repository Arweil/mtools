import React, { useMemo } from 'react';
import { ConfigProvider } from 'antd';
import type { ConfigProviderProps } from 'antd/es/config-provider';
import { AntdExtGlobalContext } from './context';
import type { Theme } from './context';
import type { ThemeColor } from '../theme/type';
import * as hermesDefaultColor from '../theme/hermes';

export interface ConfigProviderExtProps extends ConfigProviderProps {
  children?: React.ReactNode;
  themeExt?: Theme;
  tokenExt?: Partial<ThemeColor>;
}

export default function ConfigProviderExt(props: ConfigProviderExtProps) {
  const { children, themeExt = 'default', tokenExt, ...restConfigProviderProps } = props;

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
        {children}
      </AntdExtGlobalContext.Provider>
    </ConfigProvider>
  );
}

ConfigProviderExt.config = ConfigProvider.config;
