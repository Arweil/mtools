import React, { useContext, useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';
import classNames from 'classnames';
import { AntdExtGlobalContext } from '../ConfigProviderExt/context';
import type { GlobalToken } from 'antd';
import type { Theme } from '../ConfigProviderExt/context';

const { useToken } = theme;

export interface ThemeProps {
  children: React.ReactNode;
}

export interface MapTheme {
  theme?: Theme;
  className?: string;
  emotioncss?: Partial<Record<Theme, ((token: GlobalToken, prefixCls: string) => string) | undefined>>;
  themeWrap?: Partial<Record<Theme, ((props: ThemeProps) => JSX.Element) | undefined>>;
}

export default function useMapTheme(props: MapTheme) {
  const { token } = useToken();
  const { themeExt } = useContext(AntdExtGlobalContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const { className, theme: customTheme, emotioncss, themeWrap } = props;

  const classes = useMemo(
    () => (
      {
        hermes: classNames(className, [emotioncss && emotioncss.hermes && emotioncss.hermes(token, getPrefixCls())]),
        zeus: classNames(className, [emotioncss && emotioncss.zeus && emotioncss.zeus(token, getPrefixCls())]),
        default: classNames(className, [emotioncss && emotioncss.default && emotioncss.default(token, getPrefixCls())]),
      }[customTheme || themeExt]
    ),
    [className, token, customTheme, themeExt]
  );

  const DefaultTheme = useMemo(() => (props: ThemeProps) => <>{props.children}</>, []);

  const ThemeWrapper = useMemo(() => (
    {
      hermes: themeWrap && themeWrap.hermes || DefaultTheme,
      zeus: themeWrap && themeWrap.zeus || DefaultTheme,
      default: themeWrap && themeWrap.default || DefaultTheme,
    }[customTheme || themeExt]
  ), [customTheme, themeExt]);

  return {
    classes,
    ThemeWrapper,
    theme: customTheme,
    globalTheme: themeExt,
  };
}
