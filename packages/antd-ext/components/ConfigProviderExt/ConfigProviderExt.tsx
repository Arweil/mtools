import { ConfigProvider } from 'antd';
import type { ConfigProviderProps } from 'antd/es/config-provider';
import { globalConfig } from 'antd/es/config-provider';
import React, { useMemo } from 'react';
import * as hermesDefaultColor from '../theme/hermes';
import type { ThemeColor } from '../theme/type';
import * as zeusDefaultColor from '../theme/zeus';
import type { Theme } from './context';
import { AntdExtGlobalContext } from './context';

export interface ConfigProviderExtProps extends ConfigProviderProps {
  children?: React.ReactNode;
  themeExt?: Theme;
  tokenExt?: Partial<ThemeColor>;
}

type GlobalConfigProps = Parameters<(typeof ConfigProvider)['config']>[0];
export interface ConfigProviderExtConfig extends GlobalConfigProps {
  themeExt?: Theme;
}

let globalThemeExt: string;

const globalConfigExt = () => ({
  getThemeExt: () => globalThemeExt,
  ...globalConfig(),
});

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
        {children}
      </AntdExtGlobalContext.Provider>
    </ConfigProvider>
  );
}

ConfigProviderExt.config = (config: ConfigProviderExtConfig) => {
  const { themeExt, ...rest } = config;
  if (themeExt !== undefined) {
    globalThemeExt = themeExt;
  }
  return ConfigProvider.config(rest);
};
ConfigProviderExt.useConfig = ConfigProvider.useConfig;

export { globalConfigExt as globalConfig };
