import { ConfigProvider } from 'antd';
import type { ConfigProviderProps } from 'antd/es/config-provider';
import type { ComponentTokenMap } from 'antd/es/theme/interface';
import React, { useMemo } from 'react';
import type { ThemeConfig } from 'antd/es/config-provider/context';

export interface ThemeWrapperProps extends ConfigProviderProps {
  type: keyof ComponentTokenMap | (keyof ComponentTokenMap)[];
}

export default function ThemeWrapper(props: ThemeWrapperProps) {
  const { children, theme, type, ...restProps } = props;

  const components = useMemo(() => {
    return Array.isArray(type)
      ? type.reduce((pre, cur) => ({ ...pre, [cur]: (theme.components ?? {})[cur] }), {})
      : { [type]: (theme.components ?? {})[type] };
  }, [theme, type]);

  return (
    <ConfigProvider
      theme={{
        token: theme.token,
        components,
      }}
      {...restProps}
    >
      {children}
    </ConfigProvider>
  );
}
