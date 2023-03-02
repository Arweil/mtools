import React, { useMemo, useContext } from "react";
import { theme } from "antd";
import ButtonExt from "./ButtonExt";
import type { ButtonExtProps } from "./ButtonExt";
import {
  Theme as ThemeHermes,
  customStyle as customStyleHermes,
  ThemeProps
} from "./ThemeHermes";
import classNames from "classnames";
import { AntdExtGlobalContext } from '../ConfigProviderExt/context';
import type { Theme } from '../ConfigProviderExt/context';
import { ConfigProvider } from 'antd';

const { useToken } = theme;

export interface ButtonExtMinixProps extends ButtonExtProps {
  theme?: Theme;
}

export default function Minix(props: ButtonExtMinixProps) {
  const { token } = useToken();
  const { themeExt } = useContext(AntdExtGlobalContext);
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const { className, theme: customTheme, ...restProps } = props;

  const classes = useMemo(
    () => (
      {
        hermes: classNames(className, [customStyleHermes(token, getPrefixCls())]),
        zeus: classNames(className),
        default: classNames(className),
      }[customTheme || themeExt]
    ),
    [className, token, customTheme, themeExt]
  );

  const Theme = useMemo(() => (
    {
      hermes: ThemeHermes,
      zeus: (props: ThemeProps) => <>{props.children}</>,
      default: (props: ThemeProps) => <>{props.children}</>,
    }[customTheme || themeExt]
  ), [customTheme, themeExt]);

  return (
    <Theme>
      <ButtonExt className={classes} {...restProps} />
    </Theme>
  );
};
