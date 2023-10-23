import React from 'react';
import ButtonExt from './ButtonExt';
import type { ButtonExtProps } from './ButtonExt';
import { Theme as ThemeHermes, customStyle as customStyleHermes } from './ThemeHermes';
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';

export interface ButtonExtMixinProps extends ButtonExtProps {
  theme?: Theme;
}

export default function Mixin(props: ButtonExtMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, ThemeWrapper, tokenExt } = useMapTheme({
    className,
    theme,
    themeWrap: {
      hermes: ThemeHermes,
    },
    emotioncss: {
      hermes: customStyleHermes,
    },
  });

  return (
    <ThemeWrapper tokenExt={tokenExt}>
      <ButtonExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
