import React, { useContext, useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';
import classNames from 'classnames';
import { AntdExtGlobalContext } from '../ConfigProviderExt/context';
import * as hermesDefaultColor from '../theme/hermes';
import type { GlobalToken } from 'antd';
import type { Theme } from '../ConfigProviderExt/context';
import type { ThemeColor } from '../theme/type';
import { mergeColor } from './index';

const { useToken } = theme;

export interface ThemeProps {
  children: React.ReactNode;
  tokenExt?: Partial<ThemeColor>;
}

export interface MapTheme {
  theme?: Theme;
  className?: string;
  emotioncss?: Partial<
    Record<
      Theme,
      ((token: GlobalToken, prefixCls: string, tokenExt: Partial<ThemeColor>) => string) | undefined
    >
  >;
  themeWrap?: Partial<Record<Theme, ((props: ThemeProps) => JSX.Element) | undefined>>;
}

export default function useMapTheme(props: MapTheme) {
  const { token } = useToken();
  const { themeExt, tokenExt } = useContext(AntdExtGlobalContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const { className, theme: customTheme, emotioncss, themeWrap } = props;

  const mergedColor = useMemo(
    () => mergeColor(hermesDefaultColor, tokenExt || {}),
    [hermesDefaultColor, tokenExt],
  );

  const prefix = useMemo(getPrefixCls, [getPrefixCls]);

  const classes = useMemo(
    () =>
      ({
        hermes: classNames(className, [
          emotioncss && emotioncss.hermes && emotioncss.hermes(token, prefix, mergedColor),
        ]),
        zeus: classNames(className, [
          emotioncss && emotioncss.zeus && emotioncss.zeus(token, prefix, mergedColor),
        ]),
        default: classNames(className, [
          emotioncss && emotioncss.default && emotioncss.default(token, prefix, mergedColor),
        ]),
      }[customTheme || themeExt]),
    [className, token, customTheme, themeExt, mergedColor],
  );

  const DefaultTheme = useMemo(() => (props: ThemeProps) => <>{props.children}</>, []);

  const ThemeWrapper = useMemo(
    () =>
      ({
        hermes: (themeWrap && themeWrap.hermes) || DefaultTheme,
        zeus: (themeWrap && themeWrap.zeus) || DefaultTheme,
        default: (themeWrap && themeWrap.default) || DefaultTheme,
      }[customTheme || themeExt]),
    [customTheme, themeExt],
  );

  return {
    classes,
    ThemeWrapper,
    theme: customTheme,
    globalTheme: themeExt,
    token,
    tokenExt: mergedColor,
    prefix,
  };
}
