import { ConfigProvider } from 'antd';
import type { ConfigProviderProps, ThemeConfig } from 'antd/es/config-provider';
import type { Theme as AntdTheme } from 'antd/es/config-provider/context';
import React, { useMemo } from 'react';
import GlobalStyle from '../GlobalStyle';
import * as hermesDefaultColor from '../theme/hermes';
import type { ThemeColor } from '../theme/type';
import * as zeusDefaultColor from '../theme/zeus';
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
      zeus: { ...zeusDefaultColor, ...(tokenExt || {}) } as ThemeColor,
      default: (tokenExt || {}) as ThemeColor,
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

export interface GlobalConfigProps {
  prefixCls?: string;
  iconPrefixCls?: string;
  theme?: AntdTheme | ThemeConfig;
  holderRender?: (children: React.ReactNode) => React.ReactNode;
}

ConfigProviderExt.config = (config: GlobalConfigProps) => {
  return ConfigProvider.config(config);
};

ConfigProviderExt.useConfig = ConfigProvider.useConfig;
