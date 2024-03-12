import { useTheme } from '@emotion/react';
import type { GlobalToken } from 'antd';
import { ConfigProvider, theme } from 'antd';
import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { createHermesTheme, mergeTheme } from '.';
import type { Theme } from '../ConfigProviderExt/context';
import { AntdExtGlobalContext } from '../ConfigProviderExt/context';
import type { ThemeColor } from '../theme/type';
import useTokenExt from './useTokenExt';

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

export const DefaultThemeWithMemo = React.memo(function DefaultTheme(props: ThemeProps) {
  return <>{props.children}</>;
});

export default function useMapTheme(props: MapTheme) {
  // antd tokens
  const { token } = useToken();
  // ConfigProvider theme
  const a = useTheme();
  // 自定义主题 'zeus' | 'hermes' | 'default'，以及对应主题合并后的自定义token
  // 没有用 ConfigProvider 时，mergedTokenExt 为 {}
  const { themeExt } = useContext(AntdExtGlobalContext);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  // customTheme: 组件级别theme
  const { className, theme: customTheme, emotioncss, themeWrap } = props;

  const finTheme = customTheme || themeExt;

  const tokenExt = useTokenExt(finTheme);

  const prefix = useMemo(getPrefixCls, [getPrefixCls]);

  const classes = useMemo(
    () =>
      ({
        hermes: classNames(className, [
          emotioncss && emotioncss.hermes && emotioncss.hermes(token, prefix, tokenExt),
        ]),
        zeus: classNames(className, [
          emotioncss && emotioncss.zeus && emotioncss.zeus(token, prefix, tokenExt),
        ]),
        default: classNames(className, [
          emotioncss && emotioncss.default && emotioncss.default(token, prefix, tokenExt),
        ]),
      }[finTheme]),
    [className, emotioncss, token, prefix, tokenExt, finTheme],
  );

  const ThemeWrapper = useMemo(
    () =>
      ({
        hermes: (themeWrap && themeWrap.hermes) || DefaultThemeWithMemo,
        zeus: (themeWrap && themeWrap.zeus) || DefaultThemeWithMemo,
        default: (themeWrap && themeWrap.default) || DefaultThemeWithMemo,
      }[finTheme]),
    [finTheme, themeWrap],
  );

  const themeConfig = useMemo(() => {
    return {
      hermes: mergeTheme(createHermesTheme(tokenExt), a),
      zeus: mergeTheme(createHermesTheme(tokenExt), a),
      default: {},
    }[finTheme];
  }, [finTheme, tokenExt, a]);

  return {
    classes,
    ThemeWrapper,
    theme: finTheme,
    themeConfig,
    token,
    tokenExt,
    prefix,
  };
}
