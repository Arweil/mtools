import React from 'react';
import ButtonExt from './ButtonExt';
import type { ButtonExtProps } from './ButtonExt';
import { customStyle as customStyleHermes } from './ThemeHermes';
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';
import ThemeWrapper from '../theme/ThemeWrapper';

export interface ButtonExtMixinProps extends ButtonExtProps {
  theme?: Theme;
}

export default function Mixin(props: ButtonExtMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyleHermes,
    },
  });

  return (
    <ThemeWrapper autoInsertSpaceInButton={theme !== 'hermes'} theme={themeConfig} type="Button">
      <ButtonExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
