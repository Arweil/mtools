import React, { useContext, useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';
import classNames from 'classnames';
import { AntdExtGlobalContext } from '../ConfigProviderExt/context';
import type { GlobalToken } from 'antd';
import type { Theme } from '../ConfigProviderExt/context';
import type { ThemeColor } from '../theme/type';
import { createHermesTheme, mergeTheme } from '.';
import { useTheme } from '@emotion/react';
import * as hermesToken from '../theme/hermes';

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
  const { token } = useToken();
  const a = useTheme();
  const { themeExt, mergedTokenExt } = useContext(AntdExtGlobalContext);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const { className, theme: customTheme, emotioncss, themeWrap } = props;

  const finTheme = customTheme || themeExt;

  const prefix = useMemo(getPrefixCls, [getPrefixCls]);

  const classes = useMemo(
    () =>
      ({
        hermes: classNames(className, [
          emotioncss &&
            emotioncss.hermes &&
            emotioncss.hermes(token, prefix, mergedTokenExt || hermesToken),
        ]),
        zeus: classNames(className, [
          emotioncss && emotioncss.zeus && emotioncss.zeus(token, prefix, mergedTokenExt),
        ]),
        default: classNames(className, [
          emotioncss && emotioncss.default && emotioncss.default(token, prefix, mergedTokenExt),
        ]),
      }[finTheme]),
    [className, emotioncss, token, prefix, mergedTokenExt, finTheme],
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
      hermes: mergeTheme(createHermesTheme(mergedTokenExt || hermesToken), a),
      zeus: {},
      default: {},
    }[finTheme];
  }, [finTheme, mergedTokenExt, a]);

  return {
    classes,
    ThemeWrapper,
    theme: finTheme,
    themeConfig,
    token,
    tokenExt: mergedTokenExt || hermesToken,
    prefix,
  };
}
