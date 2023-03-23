import React from "react";
import ButtonExt from "./ButtonExt";
import type { ButtonExtProps } from "./ButtonExt";
import {
  Theme as ThemeHermes,
  customStyle as customStyleHermes} from "./ThemeHermes";
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from "../utils/useMapTheme";

export interface ButtonExtMinixProps extends ButtonExtProps {
  theme?: Theme;
}

export default function Minix(props: ButtonExtMinixProps) {
  const { className, theme, ...restProps } = props;
  const { classes, ThemeWrapper } = useMapTheme({
    className,
    theme,
    themeWrap: {
      hermes: ThemeHermes,
    },
    emotioncss: {
      hermes: customStyleHermes,
    }
  });

  return (
    <ThemeWrapper>
      <ButtonExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
};
